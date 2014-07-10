var loopback = require(('../'));
var assert = require('assert');

describe('Application', function () {
  MODELS_LOOPBACK = [
    {
      definition: {
        name: 'Model1',
        rawProperties: {
          Prop1Name: {
            doc: 'Prop1Desc',
            id: true,
            required: true,
            type: 'integer'
          },
          Prop2Name: {
            doc: 'Prop2Desc',
            required: false,
            type: 'string'
          },
          Prop3Name: {
            doc: 'Prop3Desc',
            required: true,
            type: '[Model2]'
          }
        }
      }
    },
    {
      definition: {
        name: 'Model2',
        rawProperties: {
          PropAName: {
            doc: 'PropADesc',
            id: true,
            required: true,
            type: 'integer'
          },
          PropBName: {
            doc: 'PropBDesc',
            required: false,
            type: 'boolean'
          },
          PropCName: {
            doc: 'PropCDesc',
            type: 'object'
          }
        }
      }
    }
  ];

  MODELS_SWAGGER = {
    Model1: {
      id: 'Model1',
      properties: {
        Prop1Name: {
          description: 'Prop1Desc',
          required: true,
          type: 'integer'
        },
        Prop2Name: {
          description: 'Prop2Desc',
          required: false,
          type: 'string'
        },
        Prop3Name: {
          description: 'Prop3Desc',
          required: true,
          type: 'array',
          items: {
            $ref: 'Model2'
          }
        }
      },
      required: [
        'Prop1Name',
        'Prop3Name'
      ]
    },
    Model2: {
      id: 'Model2',
      properties: {
        PropAName: {
          description: 'PropADesc',
          required: true,
          type: 'integer'
        },
        PropBName: {
          description: 'PropBDesc',
          required: false,
          type: 'boolean'
        },
        PropCName: {
          description: 'PropCDesc',
          type: 'object'
        }
      },
      required: [
        'PropAName'
      ]
    }
  };

  it('knows simple types are not lists', function (done) {
    assert.equal(loopback().isListType('string'), null);
    done();
  });

  it('knows braced types are lists', function (done) {
    assert.equal(loopback().isListType('[Model1]'), 'Model1');
    done();
  });

  it('knows function types are not lists', function (done) {
    assert.equal(loopback().isListType(Number), null);
    done();
  });

  it('Create a new application', function (done) {
    var swaggerModels = loopback().convertToSwagger(MODELS_LOOPBACK);
    assert.deepEqual(JSON.stringify(swaggerModels), JSON.stringify(MODELS_SWAGGER));
    done();
  });
});
