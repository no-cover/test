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
 * @file common.js
 * @brief Common NaCl application page configuration.
 */

var canSend = false;

var nacl;
var nmf_path_name = "/test/sockets.nmf";
var nacl_width = 0;         // NaCl module view width and height in pixels.
var nacl_height = 0;
var uses_logging = true;   // If "false" - hides logs area on the HTML page.

function exampleSpecificActionAfterNaclLoad() {
  nacl = document.getElementById('listener').getElementsByTagName('embed')[0];
}

var logs;
var kLogPrefix = "LOG:";
var kErrorPrefix = "ERROR:";
var kDebugPrefix = "DEBUG:";

function updateStatus(message) {
  document.getElementById("status").innerHTML = message;
}

function handleNaclCrash(event) {
  var nacl_module = document.getElementById("nacl_module");
  updateStatus("Crashed/exited with status: " + nacl_module.exitStatus);
}

function handleNaclLoad(event) {
  canSend = true;
  updateStatus("Loaded successfully.");
  if (typeof(exampleSpecificActionAfterNaclLoad) == "function") {
    exampleSpecificActionAfterNaclLoad();
  }
}

/**
 * Creates a NaCl module with params from example.js and attach listeners.
 * 
 * @param nmf_path_name - complete manifest file path with name
 * @param width - of a NaCl module"s view in pixels
 * @param height - of a NaCl module"s view in pixels
 */
function createNaclModule(nmf_path_name, width, height) {
  var nacl_elem = document.createElement("embed");
  nacl_elem.setAttribute("name", "nacl_module");
  nacl_elem.setAttribute("id", "nacl_module");
  nacl_elem.setAttribute("type", "application/x-nacl");
  nacl_elem.setAttribute("src", nmf_path_name);
  nacl_elem.setAttribute("width", width);
  nacl_elem.setAttribute("height", height);

  var listenerDiv = document.getElementById("listener");
  listenerDiv.appendChild(nacl_elem);

  // attach common listeners
  listenerDiv.addEventListener("message", handleNaclMessage, true);
  listenerDiv.addEventListener("crash", handleNaclCrash, true);
  listenerDiv.addEventListener("load", handleNaclLoad, true);
}

/**
 * Configure this page with example specific elements when document finishes
 * loading.
 */
document.addEventListener("DOMContentLoaded", function() {
  createNaclModule(nmf_path_name, nacl_width, nacl_height);
  updateStatus("Loading...");
});
