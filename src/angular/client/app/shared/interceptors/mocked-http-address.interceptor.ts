import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressPages } from '@/models';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

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
        password: undefined,
        emailAddress: 'address.n001@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_002',
        password: undefined,
        emailAddress: 'address.n002@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_003',
        password: undefined,
        emailAddress: 'address.n003@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_004',
        password: undefined,
        emailAddress: 'address.n004@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_005',
        password: undefined,
        emailAddress: 'address.n005@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_006',
        password: undefined,
        emailAddress: 'address.n006@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_007',
        password: undefined,
        emailAddress: 'address.n007@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_008',
        password: undefined,
        emailAddress: 'address.n008@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_009',
        password: undefined,
        emailAddress: 'address.n009@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_010',
        password: undefined,
        emailAddress: 'address.n010@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_011',
        password: undefined,
        emailAddress: 'address.n011@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_012',
        password: undefined,
        emailAddress: 'address.n012@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_013',
        password: undefined,
        emailAddress: 'address.n013@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_014',
        password: undefined,
        emailAddress: 'address.n014@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_015',
        password: undefined,
        emailAddress: 'address.n015@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_016',
        password: undefined,
        emailAddress: 'address.n016@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_017',
        password: undefined,
        emailAddress: 'address.n017@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_018',
        password: undefined,
        emailAddress: 'address.n018@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_019',
        password: undefined,
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
        password: undefined,
        emailAddress: 'address.n020@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_021',
        password: undefined,
        emailAddress: 'address.n021@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_022',
        password: undefined,
        emailAddress: 'address.n022@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_023',
        password: undefined,
        emailAddress: 'address.n023@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_024',
        password: undefined,
        emailAddress: 'address.n024@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_025',
        password: undefined,
        emailAddress: 'address.n025@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_026',
        password: undefined,
        emailAddress: 'address.n026@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_027',
        password: undefined,
        emailAddress: 'address.n027@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_028',
        password: undefined,
        emailAddress: 'address.n028@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_029',
        password: undefined,
        emailAddress: 'address.n029@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_030',
        password: undefined,
        emailAddress: 'address.n030@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_031',
        password: undefined,
        emailAddress: 'address.n031@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_032',
        password: undefined,
        emailAddress: 'address.n032@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_033',
        password: undefined,
        emailAddress: 'address.n033@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_034',
        password: undefined,
        emailAddress: 'address.n034@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_035',
        password: undefined,
        emailAddress: 'address.n035@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_036',
        password: undefined,
        emailAddress: 'address.n036@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_037',
        password: undefined,
        emailAddress: 'address.n037@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_038',
        password: undefined,
        emailAddress: 'address.n038@domain.tld',
        forwardingEnabled: false,
      },
    ],
  },
  {
    count: 19,
    total: 57,
    cursor: undefined,
    addresses: [
      {
        name: 'Sample_039',
        password: undefined,
        emailAddress: 'address.n039@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_040',
        password: undefined,
        emailAddress: 'address.n040@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_041',
        password: undefined,
        emailAddress: 'address.n041@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_042',
        password: undefined,
        emailAddress: 'address.n042@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_043',
        password: undefined,
        emailAddress: 'address.n043@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_044',
        password: undefined,
        emailAddress: 'address.n044@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_045',
        password: undefined,
        emailAddress: 'address.n045@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_046',
        password: undefined,
        emailAddress: 'address.n046@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_047',
        password: undefined,
        emailAddress: 'address.n047@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_048',
        password: undefined,
        emailAddress: 'address.n048@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_049',
        password: undefined,
        emailAddress: 'address.n049@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_050',
        password: undefined,
        emailAddress: 'address.n050@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_051',
        password: undefined,
        emailAddress: 'address.n051@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_052',
        password: undefined,
        emailAddress: 'address.n052@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_053',
        password: undefined,
        emailAddress: 'address.n053@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_054',
        password: undefined,
        emailAddress: 'address.n054@domain.tld',
        forwardingEnabled: true,
      },
      {
        name: 'Sample_055',
        password: undefined,
        emailAddress: 'address.n055@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_056',
        password: undefined,
        emailAddress: 'address.n056@domain.tld',
        forwardingEnabled: false,
      },
      {
        name: 'Sample_057',
        password: undefined,
        emailAddress: 'address.n057@domain.tld',
        forwardingEnabled: false,
      },
    ],
  },
];

@Injectable()
export class MockedHttpAddressInterceptor implements HttpInterceptor {
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
      if (groups) cursor = parseInt(groups.cursor);
    }

    return of(new HttpResponse({ status: 200, body: pages[cursor] }));
  }
}
