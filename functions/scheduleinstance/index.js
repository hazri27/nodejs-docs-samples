const {google} = require('googleapis');
const cloudresourcemanager = google.cloudresourcemanager('v1');

async function main () {
  const authClient = await authorize();
  const request = {
    auth: authClient,
  };

  let response;
  do {
    if (response && response.nextPageToken) {
      request.pageToken = response.nextPageToken;
    }
    response = (await cloudresourcemanager.projects.list(request)).data;
    const projectsPage = response.projects;
    if (projectsPage) {
      for (let i = 0; i < projectsPage.length; i++) {
/*******************************************************************START*******************************************************************/
        
const Compute = require('@google-cloud/compute');
cconst compute = new Compute({

    projectId: projectsPage[i]

});
const zone = compute.zone('europe-west3-c');
// [END functions_stop_instance_pubsub]



zone.getVMs().then(function(data) {
  const vms = data[0];
});

exports.startInstancePubSub = async (event, context, callback) => {
  try {
    const payload = _validatePayload(
      JSON.parse(Buffer.from(event.data, 'base64').toString())
    );
    const options = {filter: `labels.${payload.label}`};
    const [vms] = await zone.getVMs(options);
    await Promise.all(
      vms.map(async (instance) => {
        if (payload.zone === instance.zone.id) {
          const [operation] = await compute
            .zone(payload.zone)
            .vm(instance.name)
            .start();

          return operation.promise();
        }
      })
    );

    const message = `Successfully started instance(s)`;
    console.log(message);
    callback(null, message);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
exports.stopInstancePubSub = async (event, context, callback) => {
  try {
    const payload = _validatePayload(
      JSON.parse(Buffer.from(event.data, 'base64').toString())
    );
    const options = {filter: `labels.${payload.label}`};
    const [vms] = await zone.getVMs(options);
    await Promise.all(
      vms.map(async (instance) => {
        if (payload.zone === instance.zone.id) {
          const [operation] = await compute
            .zone(payload.zone)
            .vm(instance.name)
            .stop();

          // Operation pending
          return operation.promise();
        } else {
          return Promise.resolve();
        }
      })
    );

    const message = `Successfully stopped instance(s)`;
    console.log(message);
    callback(null, message);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

const _validatePayload = (payload) => {
  if (!payload.zone) {
    throw new Error(`Attribute 'zone' missing from payload`);
  } else if (!payload.label) {
    throw new Error(`Attribute 'label' missing from payload`);
  }
  return payload;
};

        
        
/*******************************************************************END************************************************************************/

        console.log(JSON.stringify(projectsPage[i], null, 2));
      }
    }
  } while (response.nextPageToken);
}
main();

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  return await auth.getClient();
}

/************************************************************************************************************************************************/
