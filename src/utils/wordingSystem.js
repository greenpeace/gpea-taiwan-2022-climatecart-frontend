/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import * as R from 'ramda'

let _wording = null;

export const loadWordingJson = source => {
  if (typeof source === 'string') {
    return new Promise((resolve, reject) => {
      axios(source)
        .then( r => r.data )
        .then( data => {
          _wording = data;
          resolve();
        })
        .catch( err => {
          reject(err);
        })
    });
  }
  else {
    _wording = source;
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export const useWordingLoader = source => {

  const isSourceObject = (typeof source === 'object');

  if (isSourceObject) {
    _wording = source;
  }

  const [ wordingLoaded, setWordingLoaded ] = useState(isSourceObject);

  useEffect(() => {
    if (typeof source === 'string') {
      loadWordingJson(source).then(() => setWordingLoaded(true));
    }
  }, [])

  return wordingLoaded;
}

export const _w = (...path) => {
  if (!_wording) return undefined;

  if (path.length === 1 ) 
    path = path[0].split('.');
  
  let value = R.path(path, _wording) || '';

  if (typeof value === 'string') {
    value = decodeArrowValue(value);
    value.__proto__.currentValue = value;
    value.__proto__.nl2br = () => nl2br(value);
    value.__proto__.nl2p = () => nl2p(value);
    value.__proto__.nl2array = () => nl2array(value);
    value.__proto__.param = (key, replacedValue) => param(value, key, replacedValue);
  }

  if (typeof value === 'object') {
    value = decodeArrowValueFromObject(value);
  }

  return value;
}

const decodeArrowValueFromObject = obj => {
  Object.keys(obj).forEach(key => {
    obj[key] = decodeArrowValue(obj[key]);
    if (typeof obj[key] === 'object') {
      obj[key] = decodeArrowValueFromObject(obj[key]);
    }
  });
  return obj;
}

const decodeArrowValue = value => {
  if (typeof value === 'string' && value.indexOf('=>') === 0) {
    return _w(...value.replace('=>', '').split('.'));
  }
  return value;
}

export const param = (search, key, value) => {
  
  var replaceReg = new RegExp(`\\$\\{${key}\\}`, "g");
  const rtn = search.__proto__.currentValue?.replace(replaceReg, value) || '';
  search.__proto__.currentValue = rtn;
  return rtn;
}

export const nl2br = (str) => {
  if (str === null || str === undefined) return '';

  if (navigator.userAgent.match("MSIE") || navigator.userAgent.match(".NET") ) {
    return str;
  } 
  
  str = str.replace?.(/\\n/g, '\n');
  return str?.split?.('\n').map((item, key) => {
    return <Fragment key={'nl2br' + key}>{item}<br/></Fragment>
  });
}

export const nl2p = str => {
  if (str === null || str === undefined) return '';
  str = str.replace?.(/\\n/g, '\n');

  return str?.split?.('\n').map((item, key) => {
    item = item !== '' ? item : <br/>;
    return <p key={'nl2p' + key}>{item}</p> ;
  });
}

export const nl2array = str => {
  if (str === null || str === undefined) return '';
  str = str.replace?.(/\\n/g, '\n');

  return str?.split?.('\n');
}
