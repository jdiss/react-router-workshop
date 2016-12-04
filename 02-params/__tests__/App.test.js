import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

import Router from 'react-router/MemoryRouter';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// Removed React Data attributes not required for Snaphot testing
const format = (html) => {
  function replacer(match, p1, p2, p3, offset, string) {
    return [p1, p2, p3].join(' - ');
  }
// 
  let data = html.replace(/data\-reactid\=\"[0-9]*\"/g, '');
  data = data.replace(/data\-react\-checksum\=\"-[0-9]*\"/g, '');
  data = data.replace(/data\-react\-checksum\=\"[0-9]*\"/g, '');
  data = data.replace(/\<\!\-\- react\-empty\: [0-9]* \-\-\>/g, '');
  data = data.replace(/data\-reactroot\=\"\"/g, '');
  data = data.replace(/\<\!\-\- \/react\-text \-\-\>/g, '');
  data = data.replace(/\<\!\-\- react\-text\: [0-9]* \-\-\>/g, '');
  data = data.replace(/ *>/g, '>');
  return data;
}

import {
  homeHTML, aboutHTML, applicationHTML, applicationWithNotesHTML, 
  missingHTML, contactHTML, contactSuccessHTML, empty
} from "./data";

describe('app.test', () => {

  it('App renders correctly', () => {
    const div = document.createElement('div');
    const pathname = '/about';
    const html = renderToStaticMarkup(<Router initialEntries={[{ pathname }]}>
      <App />
    </Router>);

    expect(html).toContain(aboutHTML);
  });

  it('Application has appId props and notes has noteId', () => {
    const div = document.createElement('div');
    const pathname = '/application/ALF-34059/notes/987654';
    const html = renderToStaticMarkup(<Router initialEntries={[{ pathname }]}>
      <App />
    </Router>);

    expect(html).toContain(applicationWithNotesHTML);
  });

});