import React from 'react';
import Component from 'itsa-react-docviewer';

const DocumentViewer = props => {
  const config = {
      allowFullScreen: true,
      src: "http://projects.itsasbreuk.nl/react-components/itsa-docviewer/example.pdf"
  };
  return (<Component {...config} />);
}

export default DocumentViewer;
