const mongoose = require('mongoose');
const schema = mongoose.Schema;

//creating schema
const logSchema = new schema({
    level: { type: String, },
    message: { type: String,  },
    resourceId: { type: String,  },
    timestamp: { type: String, index: true },
    traceId: { type: String,  },
    spanId: { type: String,  },
    commit: { type: String,  },
    metadata: {
      parentResourceId: { type: String, },
    },
  });

module.exports = Log = mongoose.model('Log', logSchema);