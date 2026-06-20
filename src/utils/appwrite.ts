import { Client, Account, ID, type Models } from 'appwrite';

const endpoint = 'https://sgp.cloud.appwrite.io/v1';
const projectId = '6a36c07000389c34024d';

if (!endpoint || !projectId || endpoint.includes('<REGION>') || projectId.includes('<PROJECT_ID>')) {
  console.warn('Missing Appwrite endpoint and project ID. Please update src/utils/appwrite.ts');
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);
export const account = new Account(client);
export { ID };
export type { Models };
