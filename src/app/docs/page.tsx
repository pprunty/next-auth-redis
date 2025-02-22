import { getApiDocs } from '@/lib/swagger';
import SwaggerUIComponent from './swagger';

const ApiDocsPage = async () => {
  const spec = await getApiDocs();
  return <SwaggerUIComponent spec={spec} />;
};

export default ApiDocsPage;
