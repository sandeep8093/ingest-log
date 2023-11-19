const Log = require('../models/LogModel');

const ingestLog = async (req, res) => {
    try {
        const logData = req.body;
        const newLog = new Log(logData);
        await newLog.save();
        res.status(200).json({ status: 'success' , data: newLog});
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error.message });
      }
};
const queryLog = async (req, res) => {
    try {
        const query = req.query.query || '';
        const filterField = req.query.filterField || '';
        const filterValue = req.query.filterValue || '';
    
        let dateFilter = {};
        if (req.query.startDate && req.query.endDate) {
          const startDateParts = req.query.startDate.split('-');
          const endDateParts = req.query.endDate.split('-');
        
          const startDate = new Date(
            startDateParts[0], // Year
            startDateParts[1] - 1, // Month 
            startDateParts[2] // Day
          );
        
          const endDate = new Date(
            endDateParts[0], // Year
            endDateParts[1] - 1, // Month
            endDateParts[2] // Day
          );
        
          dateFilter = {
            timestamp: {
              $gte: startDate.toISOString(),
              $lte: endDate.toISOString(),
            },
          };
        }
  
      let filter = {
        ...dateFilter,
      };
      if (filterField && filterValue) {
        filter[filterField] = new RegExp(filterValue, 'i');
      }

      let logs;
      if (!req.query.query || req.query.query == ''){
            logs = await Log.find(filter);
      } else{
            logs = await Log.find(filter).or([
                { level: { $regex:  query, $options: 'i' }},
                { message: { $regex:  query, $options: 'i' } },
                { description: { $regex:  query, $options: 'i' } },
                { resourceId: { $regex:  query, $options: 'i' } },
                { traceId: { $regex:  query, $options: 'i' } },
                { spanId: { $regex:  query, $options: 'i' } },
                { commit: { $regex:  query, $options: 'i' } }
            ]);
        }
        
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', error: error.message });
    }
  };

module.exports = {
    ingestLog,
    queryLog
  };
  
