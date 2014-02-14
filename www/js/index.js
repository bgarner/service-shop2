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
    //$("#nav").load("nav/main.html");

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

    hideNavItems();
    $("#panel").removeClass("open");
    $("#services").removeClass("grey");
    $("#how").removeClass("grey");
    $("#training").removeClass("grey");

    $( "#panel" ).animate({
      width: "-=750"
      }, 300, function() {
        //put the arrow back, if we need it
        if( $('#main>#arrow') ) {
            $("#arrow").show();
        }
    });
    $("#close").hide();
}

var loadNavContent = function(id){
   // $("#nav-"+id).load("nav/"+id+".html").fadeIn();
   $("#nav-"+id).fadeIn();
}

var hideNavItems = function(){
    $("#nav-services").fadeOut(300);
    $("#nav-how").fadeOut(300);
    $("#nav-training").fadeOut(300);
}

var loadMainContent = function(c){
    $('#main').fadeOut(10);
    hideNavItems();
    $("#panel").removeClass("open");
    $("#services").removeClass("grey");
    $("#how").removeClass("grey");
    $("#training").removeClass("grey");

    $( "#panel" ).animate({
      width: "-=750"
      }, 300, function() {
        // Animation complete.
        $('#main').load("content/"+c+".html").fadeIn(500);
        //alert("done");
    });
    $("#close").hide();

    $( ".navitem" ).on( "click", function() {
        var id = $(this).attr('id');
        openPanel(id);
        $('.navitem').off('click');
    });      
}

var loadIndex = function(){
    $('#main').fadeOut(10);
    $("#close").hide();

    if($('#panel').hasClass('open')){

        hideNavItems();
        $("#panel").removeClass("open");
        $("#services").removeClass("grey");
        $("#how").removeClass("grey");
        $("#training").removeClass("grey");

        $( "#panel" ).animate({
          width: "-=750"
          }, 300, function() {
            // Animation complete.
            $('#main').load("content/index-content.html").fadeIn(500);
            //alert("done");
        });
        $("#close").hide();

        $( ".navitem" ).on( "click", function() {
            var id = $(this).attr('id');
            openPanel(id);
            $('.navitem').off('click');
        });   


    } else {
    
        $('#main').fadeOut(10);
        $('#main').load("content/index-content.html").fadeIn(500);    
      
    }


 
}


$('#logo').click(function(){  loadIndex() });
//services
$('#snowservices-nav').click(function(){   loadMainContent("snow-services")   });
$('#hockeyservices-nav').click(function(){ loadMainContent("hockey-services") });
$('#bikeservices-nav').click(function(){   loadMainContent("bike-services")   });
$('#otherservices-nav').click(function(){  loadMainContent("other-services")  });

//how we do it
$('#snowhow-nav').click(function(){ loadMainContent("snow-how") });
$('#hockeyhow-nav').click(function(){ loadMainContent("hockey-how") });
$('#bikehow-nav').click(function(){ loadMainContent("bike-how") });
$('#otherhow-nav').click(function(){ loadMainContent("other-how") });

//training
$('#ourtraining-nav').click(function(){ loadMainContent("our-training") });
$('#spectraining-nav').click(function(){ loadMainContent("spec-training") });















