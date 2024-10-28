/**
 * Copyright (c) 2015, Samsung Electronics Co., Ltd
 * All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 *  * Neither the name of Samsung Electronics nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @file communication.js
 * @brief NaCl application communication handler.
 * All NaCl <-> JS communication should be implemented in this file.
 */

/**
 * This function is called when a message from NaCl arrives.
 */


// Literals presented below are part of communication protocol between JavaScript and NaCl.

// Defines either a "New TCP Connection" if used exclusively
// or a "TCP Connection Type" if used together with other messages.
var msgTcp = 't;'

// Defines either a "New UDP Connection" if used exclusively
// or a "UDP Connection Type" if used together with other messages.
var msgUdp = 'u;'

// Send a message on a specific socket type (tcp or udp).
var msgSend = 's;'

// Close a specific socket type (tcp or udp).
var msgClose = 'c;'

// Listen on a specific socket.
var msgListen = 'l;'

  function doConnect(event) {
  // Send a connect message. See also socket.cc for the request format.
  event.preventDefault();
  var hostname = document.getElementById('hostname').value;
  var type = document.getElementById('connect_type').value;
  if (type == 'tcp') {
    nacl.postMessage(msgTcp + hostname);
  } else {
    nacl.postMessage(msgUdp + hostname);
  }
}

function doSend(event) {
  // Send a request message. See also socket.cc for the request format.
  event.preventDefault();
  var message = document.getElementById('message').value;
  var type = document.getElementById('connect_type').value;
  while (message.indexOf('\\n') > -1)
    message = message.replace('\\n', '\n');
  if (type == 'tcp') {
    nacl.postMessage(msgSend + msgTcp + message);
  } else {
    nacl.postMessage(msgSend + msgUdp + message);
  }
}

function doListen(event) {
  // Listen at the given port.
  event.preventDefault();
  var port = document.getElementById('port').value;
  var type = document.getElementById('listen_type').value;
  if (type == 'tcp') {
    nacl.postMessage(msgListen + msgTcp + port);
  } else {
    nacl.postMessage(msgListen + msgUdp + port);
  }
}

function doClose() {
  // Send a close message.
  var type = document.getElementById('connect_type').value;
  if (type == 'tcp') {
    nacl.postMessage(msgClose + msgTcp);
  } else {
    nacl.postMessage(msgClose + msgUdp);
  }
}
