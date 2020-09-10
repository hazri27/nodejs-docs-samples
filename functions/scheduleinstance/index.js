// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 //comment
// [START functions_start_instance_pubsub]
// [START functions_stop_instance_pubsub]
// Imports the Google Cloud client library
const {Resource} = require('@google-cloud/resource');
 
// Creates a client
const resource = new Resource();
const Compute = require('@google-cloud/compute');

/*
async function quickstart() {
  // Lists current projects
  const [projects] = await resource.getProjects();
 
  console.log('Current Projects are:');
 
  projects.forEach(project => {
    tst_array[count]=project.id;
    console.log("ab_projects= "+ tst_array[count]);
    count = count+1;
    });

    console.log('quickstart completed line 37 (we expect2)=  ' + count);
}
*/

//to be moved inside pub/sub quickstart();

/**
 * Starts Compute Engine instances.
 *
 * Expects a PubSub message with JSON-formatted event data containing the
 * following attributes:
 *  zone - the GCP zone the instances are located in.
 *  label - the label of instances to start.
 *
 * @param {!object} event Cloud Function PubSub message event.
 * @param {!object} callback Cloud Function PubSub callback indicating
 *  completion.
 */
exports.startInstancePubSub = async (event, context, callback) => {
  try {
    var tst_array = [];
    var count = 0; 
    //copied from quickstart
    const [projects] = await resource.getProjects();
 
  console.log('Current Projects are:');
 
  projects.forEach(project => {
    tst_array[count]=project.id;
    console.log("ab_projects= "+ tst_array[count]);
    count = count+1;
    });

    console.log('quickstart completed line 70 (we expect2)=  ' + count);

    //////////end of quickstart copy


    console.log('during startinstancepubsub line75 (we expect2)=  ' + count);
   for (var i = 0; i < count; i++){
     console.log("during for iterations line 57");
    const compute = new Compute({
    projectId: tst_array[i]
 //   projectId: 'ab-gcp-tst-common-kafka-tst'
 
});


//const zone = compute.zone('europe-west3-c');
// [END functions_stop_instance_pubsub]


 
//zone.getVMs().then(function(data) {
  //const vms = data[0];
//});
    const payload = _validatePayload(
      JSON.parse(Buffer.from(event.data, 'base64').toString())
    );
    const options = {filter: `labels.${payload.label}`};
    const [vms] = await compute.getVMs(options);
    await Promise.all(
      vms.map(async (instance) => {
        if (payload.zone === instance.zone.id) {
          const [operation] = await compute
            .zone(payload.zone)
            .vm(instance.name)
            .start();
 
          // Operation pending
          return operation.promise();
        }
      })
    );
 
    // Operation complete. Instance successfully started.
    const message = `Successfully started instance(s)`;
    console.log(message);
    callback(null, message);
  }
  
  console.log("for iterations should be completed");
  console.log('line99 (we expect2)=  ' + count);
  
  
  
  } catch (err) {
    console.log("catching errors line 104");
    console.log(err);  
    callback(err);
  }
};
// [END functions_start_instance_pubsub]
// [START functions_stop_instance_pubsub]
 

exports.stopInstancePubSub = async (event, context, callback) => {
  try {
    var tst_array = [];
    var count = 0; 
    //copied from quickstart
    const [projects] = await resource.getProjects();
 
  console.log('Current Projects are:');
 
  projects.forEach(project => {
    tst_array[count]=project.id;
    console.log("ab_projects= "+ tst_array[count]);
    count = count+1;
    });

    console.log('quickstart completed line 70 (we expect2)=  ' + count);

    //////////end of quickstart copy


    console.log('during stopinstancepubsub line75 (we expect2)=  ' + count);
   for (var i = 0; i < count; i++){
     console.log("during for iterations line 57");
    const compute = new Compute({
    projectId: tst_array[i]
 //   projectId: 'ab-gcp-tst-common-kafka-tst'
 
});


//const zone = compute.zone('europe-west3-c');
// [END functions_stop_instance_pubsub]


 
//zone.getVMs().then(function(data) {
 // const vms = data[0];
//});
    const payload = _validatePayload(
      JSON.parse(Buffer.from(event.data, 'base64').toString())
    );
    const options = {filter: `labels.${payload.label}`};
    const [vms] = await compute.getVMs(options);
    await Promise.all(
      vms.map(async (instance) => {
        if (payload.zone === instance.zone.id) {
          const [operation] = await compute
            .zone(payload.zone)
            .vm(instance.name)
            .stop();
 
          // Operation pending
          return operation.promise();
        }
      })
    );
 
    // Operation complete. Instance successfully stopped.
    const message = `Successfully stopped instance(s)`;
    console.log(message);
    callback(null, message);
  }
  
  console.log("for iterations should be completed");
  console.log('line99 (we expect2)=  ' + count);
  
  
  
  } catch (err) {
    console.log("catching errors line 104");
    console.log(err);  
    callback(err);
  }
}; 


/**
 * Validates that a request payload contains the expected fields.
 *
 * @param {!object} payload the request payload to validate.
 * @return {!object} the payload object.
 */
const _validatePayload = (payload) => {
  if (!payload.zone) {
    throw new Error(`Attribute 'zone' missing from payload`);
  } else if (!payload.label) {
    throw new Error(`Attribute 'label' missing from payload`);
  }
  return payload;
};
// [END functions_start_instance_pubsub]
// [END functions_stop_instance_pubsub]



