var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
},
width = 1200 - margin.right - margin.left,
height = 900 - margin.top - margin.bottom;

var select_one = d3.select("#tgrade").append("select")
.attr("id", "grade")
.on("change", click)

select_one.append("option").attr("value" , "blank").attr("disabled", true).text(" ")
select_one.append("option").attr("value" , "A").text("A")
select_one.append("option").attr("value" , "B").text("B")
select_one.append("option").attr("value" , "C").text("C")
select_one.append("option").attr("value" , "D").text("D")


var select_two = d3.select("#tsleep").append("select")
.attr("id", "slept")
.on("change", click)


select_two.append("option").attr("value" , "blank").attr("disabled", true).text(" ")
select_two.append("option").attr("value" , "less").text("Less than 5")
select_two.append("option").attr("value" , "between").text("Between 5 and 8")
select_two.append("option").attr("value" , "greater").text("Greater than 8")

var select_three = d3.select("#tstudy").append("select")
.attr("id", "studied")
.on("change", click)


select_three.append("option").attr("value" , "blank").attr("disabled", true).text(" ")
select_three.append("option").attr("value" , "less").text("Less than 3")
select_three.append("option").attr("value" , "greater").text("Greater than 3")

var select_four = d3.select("#tcheat").append("select")
.attr("id", "cheat")
.on("change", click)

select_four.append("option").attr("value" , "blank").attr("disabled", true).text(" ")
select_four.append("option").attr("value" , "no").text("No")
select_four.append("option").attr("value" , "yes").text("Yes")

// var button = d3.select("body").append("button")
// .attr("id", "button")
// .style("position", "absolute")
// .style("top", "80px")
// .style("left", "0px")
// .on("click", click)

function resetRoot(r){
  r["highlight"] = null
  if (r["children"]){
    for(var i = 0; i<r["children"].length; i++){
      r["children"][i] = resetRoot(r["children"][i])
    }
  }
  return r
}


function click(){
  var grade = $("#grade").val()
  var slept = $("#slept").val()
  var studied = $("#studied").val()
  var cheat = $("#cheat").val()


  root = resetRoot(root)
  root['highlight'] = true
  if(grade == "A"){
    root["children"][0]["highlight"] = true
    if(slept == "greater"){
      root["children"][0]["children"][0]["highlight"] = true
      $("#prediction").text("Prediction: YES!")

    }
    else if(slept == "between"){
      root["children"][0]["children"][1]["highlight"] = true
      if(studied == "less"){
        root["children"][0]["children"][1]["children"][1]["highlight"] = true
        $("#prediction").text("Prediction: NO!")
      }
      else if(studied == "greater"){
        root["children"][0]["children"][1]["children"][0]["highlight"] = true
        $("#prediction").text("Prediction: YES!")
      }
    }
    if(slept == "less"){
      root["children"][0]["children"][2]["highlight"] = true
      $("#prediction").text("Prediction: NO!")

    }

  }
  else if (grade == "B"){
    root["children"][1]["highlight"] = true
    if(studied == "greater"){
      root["children"][1]["children"][0]["highlight"] = true
      if(slept == "greater"){
        root["children"][1]["children"][0]["children"][0]["highlight"] = true
        $("#prediction").text("Prediction: YES!")
      }
      else if(slept == "between"){
        root["children"][1]["children"][0]["children"][1]["highlight"] = true
        $("#prediction").text("Prediction: NO!")
      }
      else if(slept == "less"){
        root["children"][1]["children"][0]["children"][2]["highlight"] = true
        $("#prediction").text("Prediction: NO!")
      }
    }
    else if(studied == "less"){
      root["children"][1]["children"][1]["highlight"] = true
      $("#prediction").text("Prediction: NO!")
    }
  }
  else if (grade == "C"){
    root["children"][2]["highlight"] = true
    if(cheat == "yes"){
      root["children"][2]["children"][0]["highlight"] = true
      if(slept == "greater"){
        root["children"][2]["children"][0]["children"][0]["highlight"] = true
        $("#prediction").text("Prediction: YES!")
      }
      else if(slept == "between"){
        root["children"][2]["children"][0]["children"][1]["highlight"] = true
        $("#prediction").text("Prediction: YES!")
      }
      else if(slept == "less"){
        root["children"][2]["children"][0]["children"][2]["highlight"] = true
        $("#prediction").text("Prediction: NO!")
      }
    }
    else if(cheat == "no"){
      root["children"][2]["children"][1]["highlight"] = true
      $("#prediction").text("Prediction: NO!")
    }
  }
  else if (grade == "D"){
    root["children"][3]["highlight"] = true
    $("#prediction").text("Prediction: NO!")
  }


  update(root)
}




var root = {
  "name": "Average Grade",
  "parent": "null",
  "highlight" : null,
  "children": [
    {
      "name": "Hours Slept",
      "parent": "Average Grade",
      "val" : "A",
      "highlight" : null,
      "children": [
        {
          "name": "Yes!",
          "parent": "Hours Slept",
          "highlight" : null,
          "val" : "greater"
        },
        {
          "name": "Hours Studied",
          "parent": "Hours Slept",
          "val": "between",
          "highlight" : null,
          "children": [
            {
              "name": "Yes!",
              "parent": "Hours Studied",
              "highlight" : null,
              "val": "greater"
            },
            {
              "name": "No!",
              "parent": "Hours Studied",
              "highlight" : null,
              "val": "less"
            },
          ]
        },
        {
          "name": "No!",
          "parent": "Hours Slept",
          "highlight" : null,
          "val" : "less"
        }
      ]
    },
    {
      "name": "Hours Studied",
      "parent": "Average Grade",
      "val" : "B",
      "highlight" : null,
      "children": [
        {
          "name": "Hours Slept",
          "parent": "Hours Studied",
          "val" : "B",
          "highlight" : null,
          "children": [
            {
              "name": "Yes!",
              "parent": "Hours Slept",
              "highlight" : null,
              "val" : "greater"
            },
            {
              "name": "No!",
              "parent": "Hours Slept",
              "highlight" : null,
              "val": "between"
            },
            {
              "name": "No!",
              "parent": "Hours Slept",
              "highlight" : null,
              "val" : "between"
            },
          ]
        },
        {
          "name": "No!",
          "parent": "Hours Slept",
          "highlight" : null,
          "val": "less"
        }
      ]
    },
    {
      "name": "Plans to Cheat",
      "parent": "Average Grade",
      "val" : "C",
      "highlight" : null,
      "children": [
        {
          "name": "Hours Slept",
          "parent": "Plans To Cheat",
          "val": "yes",
          "highlight" : null,
          "children": [
            {
              "name": "Yes!",
              "parent": "Hours Slept",
              "highlight" : null,
              "val": "greater"
            },
            {
              "name": "Yes!",
              "parent": "Hours Slept",
              "highlight" : null,
              "val" : "between"
            },
            {
              "name": "No!",
              "parent": "Hours Slept",
              "highlight" : null,
              "val" : "less"
            }
          ]
        },
        {
          "name": "No!",
          "parent": "Plans To Cheat",
          "highlight" : null,
          "val": "no"
        }
      ]
    },
    {
      "name": "No!",
      "parent": "Average Grade",
      "highlight" : null,
      "val" : "D"
    }
  ]
};



var i = 0,
    duration = 750,
    rectW = 70,
    rectH = 30;

var tree = d3.layout.tree().nodeSize([80, 40]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.x + rectW / 2, d.y + rectH / 2];
});

var svg = d3.select("#body").append("svg").attr("width", 1200).attr("height", 900).attr("pointer-events", "none")
    .call(zm = d3.behavior.zoom().scaleExtent([1,3])).append("g")
    .attr("transform", "translate(" + 500 + "," + 20 + ")");

svg.append("text")
.attr("x", "-200")
.attr("y", "115")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("A")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "0")
.attr("y", "115")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("B")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "150")
.attr("y", "115")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("C")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "255")
.attr("y", "115")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("D")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-450")
.attr("y", "280")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Greater than 8")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-375")
.attr("y", "320")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Between 5 and 8")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-280")
.attr("y", "280")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Less than 5")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-110")
.attr("y", "280")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Greater than 3")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "20")
.attr("y", "280")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Less than 3")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "270")
.attr("y", "280")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Yes")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "340")
.attr("y", "280")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("No")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-430")
.attr("y", "470")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Greater than 3")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-300")
.attr("y", "470")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Less than 3")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-180")
.attr("y", "470")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Greater than 8")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "-100")
.attr("y", "510")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Between 5 and 8")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "5")
.attr("y", "470")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Less than 5")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "150")
.attr("y", "470")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Greater than 8")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "230")
.attr("y", "510")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Between 5 and 8")
.style("fill-opacity", 1);

svg.append("text")
.attr("x", "325")
.attr("y", "470")
.attr("font-family", "sans-serif")
.attr("font-size", "12px")
//.attr("transform", "translate(" + 10 + "," + 180 + ")")
.text("Less than 5")
.style("fill-opacity", 1);

// svg.append("text")
// .attr("x", "-100")
// .attr("y", "700")
// .attr("id", "prediction")
// .attr("font-family", "sans-serif")
// .attr("font-size", "30px")
// //.attr("transform", "translate(" + 10 + "," + 180 + ")")
// .text("Prediction: ???")
// .style("fill-opacity", 1);


//necessary so that zoom knows where to zoom and unzoom from
zm.translate([500, 20]);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// root.children.forEach(collapse);
update(root);

d3.select("#body").style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Update the nodes
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
    })


    nodeEnter.append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .style("stroke", function (d) {
          if (d.highlight){return "gold";}
          else{return "black"}})
        .attr("stroke-width", 4)
        .style("fill", function (d) {
          if (d.name == 'Yes!'){return "PaleGreen";}
          else if (d.name == 'No!'){return "LightSalmon";}
          else{return "white"}
    });

    nodeEnter.append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
        return d.name;
    });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    nodeUpdate.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .style("stroke", function (d) {
          if (d.highlight){return "gold";}
          else{return "black"}})
        .attr("stroke-width", 4)
        .style("fill", function (d) {
          if (d.name == 'Yes!'){return "PaleGreen";}
          else if (d.name == 'No!'){return "LightSalmon";}
          else{return "white"}

    });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();

    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
    //.attr("width", bbox.getBBox().width)""
    //.attr("height", bbox.getBBox().height)
    .attr("stroke", "black")
        .attr("stroke-width", 1);

    nodeExit.select("text");

    // Update the links
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("d", function (d) {
        var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}


//Redraw for zoom
function redraw() {
  //console.log("here", d3.event.translate, d3.event.scale);
  svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}