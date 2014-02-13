/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$( document ).ready(function() {

    $('.navitem').click(function(){
        var id = $(this).attr('id');
        openPanel(id);
        $('.navitem').off('click'); //disable nav        
    });

    $('#close').click(function(){
        closePanel();
        $( ".navitem" ).on( "click", function() {
            var id = $(this).attr('id');
            openPanel(id);
            $('.navitem').off('click');
        });
    });

});

var openPanel = function(id){
    $("#panel").addClass("open");
    $("#arrow").hide();

    switch(id){
        case "services":
            $("#how").addClass("grey");
            $("#training").addClass("grey");
        break;

        case "how": 
            $("#services").addClass("grey");
            $("#training").addClass("grey");
        break;

        case "training": 
            $("#services").addClass("grey");
            $("#how").addClass("grey");
        break;
    }

    $( "#panel" ).animate({
      width: "+=750"
      }, 300, function() {
        // Animation complete.
        $("#close").fadeIn();  
        loadNavContent(id);
    });
}

var closePanel = function(){
    
    $("#panel").removeClass("open");

    $("#close").hide();

    $("#services").removeClass("grey");
    $("#how").removeClass("grey");
    $("#training").removeClass("grey");
    hideNavItems();
    $( "#panel" ).animate({
      width: "-=750"
      }, 300, function() {
        
        // Animation complete.
    });
}

var loadNavContent = function(id){
    $("#nav-"+id).fadeIn();
}

var hideNavItems = function(){
    $("#nav-services").fadeOut();
    $("#nav-how").fadeOut();
    $("#nav-training").fadeOut();
}
