import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  ConnectionBackend,
  Http,
  RequestMethod
} from '@angular/http';

import {
  MockBackend
} from '@angular/http/testing';

import {
  it,
  xit,
  describe,
  expect,
  inject,
  fakeAsync,
  beforeEachProviders
} from '@angular/core/testing';

import {provide} from '@angular/core';
import {ServerService} from './index';

describe('Testing server service', () => {
  const _mockPath = '/path';
  const _mockId = '1';
  const _mockResponseData = [
    { id: 1, value: 'Some response value here.'},
    { id: 2, value: 'Some other response value.'},
  ];
  const _mockNewData = {
    id: 3,
    value: 'New item',
  };

  beforeEachProviders(() => {
    return [
      MockBackend,
      BaseRequestOptions,
      provide(
        Http, {
          useFactory: (
            mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions
          ) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ),
      ServerService,
    ];
  });

  function _mockServer(mockResponseBody: any, callback: Function) {
    return fakeAsync(inject([MockBackend, ServerService],
      (mockBackend, serverService) => {

        mockBackend.connections.subscribe(
          connection => {
            if (connection.request.method === RequestMethod.Get) {
              connection.mockRespond(new Response(
                new ResponseOptions({body: _mockResponseData})
              ));
            } else if (connection.request.method === RequestMethod.Delete) {
              connection.mockRespond(new Response(
                new ResponseOptions({status: 204})
              ));
            } else {
              connection.mockRespond(new Response(
                new ResponseOptions({body: mockResponseBody})
              ));
            }
          });

        callback(serverService);
      }
    ));
  };

  it('should successfully GET data from the server',
    _mockServer(null, (serverService) => {
    serverService.get(_mockPath)
      .subscribe(
        (data) => {
        expect(data).toEqual(_mockResponseData);
      });
  }));

  it('should successfully POST data to the server',
    _mockServer(_mockNewData, (serverService) => {
      serverService.post(_mockPath, _mockNewData)
      .subscribe(
        (data) => {
        expect(data.value).toBe(_mockNewData.value);
      });
  }));

  it('should successfully PUT data on the server',
    _mockServer(_mockNewData, (serverService) => {
      serverService.put(_mockPath, _mockId, _mockNewData)
      .subscribe(
        (data) => {
        expect(data.value).toBe(_mockNewData.value);
      });
  }));

  it('should successfully DELETE data from the server',
    _mockServer(null, (serverService) => {
      serverService.delete(_mockPath, _mockId)
      .subscribe(
        (data) => {
        expect(data.status).toEqual(204);
      });
  }));

});
