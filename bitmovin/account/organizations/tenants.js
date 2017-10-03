import urljoin from 'url-join';
import http from '../../http';

export const tenants = (configuration, organizationId, groupId, http) => {
  const { get, post, delete_ } = http;
  const tenantsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'organizations', organizationId, 'groups', groupId, 'tenants');

  let fn = (tenantId) => {
    return {
      details: () => {
        let url = urljoin(tenantsBaseUrl, tenantId);
        return get(configuration, url);
      },
      delete: () => {
        let url = urljoin(tenantsBaseUrl, tenantId);
        return delete_(configuration, url);
      }
    };
  };

  fn.add = (tenant) => {
    const url = urljoin(tenantsBaseUrl);
    return post(configuration, url, tenant);
  };

  fn.list = () => {
    const url = urljoin(tenantsBaseUrl);
    return get(configuration, url);
  };

  return fn;
};

export default (configuration, organizationId, groupId) => { return permissions(configuration, organizationId, groupId, http); };
