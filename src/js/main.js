document.addEventListener('DOMContentLoaded', main);
var url = "https://7n2oejak71.execute-api.eu-central-1.amazonaws.com/latest";

// main function
function main(aURL, callback) {
    // Hit endpoint
    let httpRequest = new XMLHttpRequest()

    if ('withCredentials' in httpRequest) {
    	httpRequest.open('GET', url, true)
    
    // Once the requests state changes, we execute this function
    httpRequest.onreadystatechange = function(){
      // Handle the server response here 
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
        	var data = JSON.parse(this.responseText)
          	// Logic to populate page with data here using DOM manipulations
          if (callback && typeof(callback) === "function") {
        	   callback(data);
          }
        }
        else {
          alert('There was some problem with the request.');
        }
      }
    }
     httpRequest.send()
	}
}

main(url, function(x) {
	var totalUsers = x.usersPanel.totalUsers;
	var totalUsersGoal = x.usersPanel.totalUsersGoal;
	var percent = (totalUsers / totalUsersGoal) * 100;
  document.getElementsByClassName("user-bar")[0].style.width = percent + "%";
  document.getElementById("user-total-amt").innerHTML = totalUsersGoal;
	document.getElementById("user-amt").innerHTML = totalUsers;
  document.getElementById("churn-rate").innerHTML = x.usersPanel.churnRate;
  document.getElementById("aa-cost").innerHTML = "$" + x.usersPanel.acquisitionCost;
  document.getElementById("atf-bounce").innerHTML = x.usersPanel.aboveTheFoldBounce;
});

main(url, function(x) {
	var dailyVisits = x.webTrafficPanel.dailyVisits;
	var dailyVisitGoal = x.webTrafficPanel.dailyVisitGoal;
	var percent = (dailyVisits / dailyVisitGoal) * 100;
  document.getElementsByClassName("traffic-bar")[0].style.width = percent + "%";
  document.getElementById("traffic-total-amt").innerHTML = dailyVisitGoal;
	document.getElementById("traffic-amt").innerHTML = dailyVisits;
	document.getElementById("active-connections").innerHTML = x.webTrafficPanel.currentActiveConnections;
	document.getElementById("unique-visits").innerHTML = x.webTrafficPanel.uniqueVisitsToday;
  var loadPerfElem = document.getElementById("load-performance");
	var loadPerformance = x.webTrafficPanel.loadPerformance;
  // Load performance status color setting.
	if (loadPerformance === "GOOD") {
    loadPerfElem.style.color = "#7ED798";
    loadPerfElem.innerHTML = loadPerformance;
  } else {
    loadPerfElem.style.color = "#D0021B";
    loadPerfElem.innerHTML = loadPerformance;
    document.getElementById("seo-ranking").innerHTML = x.webTrafficPanel.seoRanking;
  }
})

main(url, function(x) {
  var clickThroughs = x.emailPanel.clickThroughs;
  var clickThroughGoal = x.emailPanel.clickThroughGoal;
  var percent = (clickThroughs / clickThroughGoal) * 100;
  document.getElementsByClassName("email-bar")[0].style.width = percent + "%";
  document.getElementById("email-total-amt").innerHTML = clickThroughGoal;
  document.getElementById("email-amt").innerHTML = clickThroughs;
});

function openNav() {
    var x = document.getElementById("nav-links");
    if ( $(window).width() < 1024) {
  		if (x.style.width === "100%") {
    	x.style.width = "0%";
	    } else {
	    	x.style.width = "100%";
	    }
	} 
	else {
	  x.style.display = "block"
	}
}
