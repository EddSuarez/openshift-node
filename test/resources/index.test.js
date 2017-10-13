import chai from 'chai';

import {endpoints} from '../../src/resources';

const expect = chai.expect;

describe('Endpoints', () => {
  it('returns templated endpoint for projects', () => {
    const expected = '/oapi/v1/projects/test';
    const namespace = 'test';
    expect(endpoints.get('Projects', {namespace})).to.equal(expected);
  });
});
