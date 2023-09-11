'use strict';

export default function shuffleElements(arr) {
    let res = arr.sort(() => Math.random() - 0.5);
    return res;
  }