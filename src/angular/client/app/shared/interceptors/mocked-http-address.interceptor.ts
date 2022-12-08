import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AddressPages } from '../models/model';

// generated using the following PowerShell script
//
const pages: AddressPages[] = [
  {
    count: 19,
    total: 57,
    cursor: '1',
    addresses: [
      {
        name: 'Sample_001',
        password: null,
        emailAddress: 'address.n001@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_002',
        password: null,
        emailAddress: 'address.n002@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_003',
        password: null,
        emailAddress: 'address.n003@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_004',
        password: null,
        emailAddress: 'address.n004@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_005',
        password: null,
        emailAddress: 'address.n005@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_006',
        password: null,
        emailAddress: 'address.n006@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_007',
        password: null,
        emailAddress: 'address.n007@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_008',
        password: null,
        emailAddress: 'address.n008@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_009',
        password: null,
        emailAddress: 'address.n009@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_010',
        password: null,
        emailAddress: 'address.n010@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_011',
        password: null,
        emailAddress: 'address.n011@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_012',
        password: null,
        emailAddress: 'address.n012@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_013',
        password: null,
        emailAddress: 'address.n013@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_014',
        password: null,
        emailAddress: 'address.n014@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_015',
        password: null,
        emailAddress: 'address.n015@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_016',
        password: null,
        emailAddress: 'address.n016@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_017',
        password: null,
        emailAddress: 'address.n017@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_018',
        password: null,
        emailAddress: 'address.n018@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_019',
        password: null,
        emailAddress: 'address.n019@domain.tld',
        forwardingEnabled: true,
      },
    ],
  },
  {
    count: 19,
    total: 57,
    cursor: '2',
    addresses: [
      {
        name: 'Sample_020',
        password: null,
        emailAddress: 'address.n020@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_021',
        password: null,
        emailAddress: 'address.n021@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_022',
        password: null,
        emailAddress: 'address.n022@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_023',
        password: null,
        emailAddress: 'address.n023@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_024',
        password: null,
        emailAddress: 'address.n024@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_025',
        password: null,
        emailAddress: 'address.n025@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_026',
        password: null,
        emailAddress: 'address.n026@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_027',
        password: null,
        emailAddress: 'address.n027@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_028',
        password: null,
        emailAddress: 'address.n028@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_029',
        password: null,
        emailAddress: 'address.n029@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_030',
        password: null,
        emailAddress: 'address.n030@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_031',
        password: null,
        emailAddress: 'address.n031@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_032',
        password: null,
        emailAddress: 'address.n032@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_033',
        password: null,
        emailAddress: 'address.n033@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_034',
        password: null,
        emailAddress: 'address.n034@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_035',
        password: null,
        emailAddress: 'address.n035@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_036',
        password: null,
        emailAddress: 'address.n036@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_037',
        password: null,
        emailAddress: 'address.n037@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_038',
        password: null,
        emailAddress: 'address.n038@domain.tld',
        forwardingEnabled: false,
      },
    ],
  },
  {
    count: 19,
    total: 57,
    cursor: null,
    addresses: [
      {
        name: 'Sample_039',
        password: null,
        emailAddress: 'address.n039@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_040',
        password: null,
        emailAddress: 'address.n040@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_041',
        password: null,
        emailAddress: 'address.n041@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_042',
        password: null,
        emailAddress: 'address.n042@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_043',
        password: null,
        emailAddress: 'address.n043@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_044',
        password: null,
        emailAddress: 'address.n044@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_045',
        password: null,
        emailAddress: 'address.n045@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_046',
        password: null,
        emailAddress: 'address.n046@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_047',
        password: null,
        emailAddress: 'address.n047@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_048',
        password: null,
        emailAddress: 'address.n048@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_049',
        password: null,
        emailAddress: 'address.n049@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_050',
        password: null,
        emailAddress: 'address.n050@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_051',
        password: null,
        emailAddress: 'address.n051@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_052',
        password: null,
        emailAddress: 'address.n052@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_053',
        password: null,
        emailAddress: 'address.n053@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_054',
        password: null,
        emailAddress: 'address.n054@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_055',
        password: null,
        emailAddress: 'address.n055@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_056',
        password: null,
        emailAddress: 'address.n056@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_057',
        password: null,
        emailAddress: 'address.n057@domain.tld',
        forwardingEnabled: false,
      },
    ],
  },
];

@Injectable()
export class MockedHttpAddressInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req.urlWithParams);
    if (req.urlWithParams.endsWith('/api/profiles/my')) return next.handle(req);

    var match = req.urlWithParams.match(/cursor=(?<cursor>[0-9])$/);
    var cursor = 0;
    if (match !== null) {
      const { groups } = match;
      cursor = parseInt(groups.cursor);
    }

    return of(new HttpResponse({ status: 200, body: pages[cursor] }));
  }
}
