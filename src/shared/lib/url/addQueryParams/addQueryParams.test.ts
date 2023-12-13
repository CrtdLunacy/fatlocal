import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
    test('test with 1 param', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toBe('?test=value');
    });

    test('test with multiple params', () => {
        const params = getQueryParams({
            test: 'value',
            search: 'value2',
            sort: 'value3',
        });
        expect(params).toEqual('?test=value&search=value2&sort=value3');
    });

    test('test with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            search: undefined,
        });
        expect(params).toEqual('?test=value');
    });
});
