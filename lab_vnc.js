function load_other_vmi(vmi) {
    var params = new URLSearchParams(window.location.search);
    console.log(vmi);
    var path = params.get("path").split("/");
    if (path.length == 2) {
        console.log("No Prefix")
        path[1] = vmi;
        params.set("path", path.join("/"));
        history.replaceState(null, null, "?"+params.toString());
        window.location.search = "?" + params.toString();
    } else {
        console.log("With Prefix")
        path[2] = vmi;
        params.set("path", path.join("/"));
        history.replaceState(null, null, "?"+params.toString());
        window.location.search = "?" + params.toString();
    }
}
function load_vmis() {
    var params = new URLSearchParams(window.location.search);
    var allowed_vmis = params.get("allowed_vmis").split(",");
    var path = params.get("path").split("/");
    var current_vmi;
    if (path.length == 2){
        current_vmi = path[1];
    } else {
        current_vmi = path[2];
    }
    allowed_vmis.forEach(function(vmi) {
        var node = document.createElement("option");
        node.value = vmi;
        node.text = vmi;
        if (current_vmi == vmi) {
            node.selected = true;
        }
        document.getElementById("noVNC_setting_vm").appendChild(node);
    });
    document.getElementById("noVNC_setting_vm").addEventListener("change", e => load_other_vmi(e.target.value));
}

const parseJwt = (token) => {
  // this method is insecure because the signature is not verified
  // to verify the signature an asymmetric method needs to be used
  // when generating the token
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function load_instructions() {
    var params = new URLSearchParams(window.location.search);
    var path = params.get("path").split("/");
    var token;
    if (path.length == 2){
        token = path[0];
    } else {
        token = path[1];
    }
    var decoded = parseJwt(token);
    var lab_id = decoded['lab_instance']['lab_id']
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:8000/api/instruction_page/?lab_id=${lab_id}`
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json)
            // TODO: insert pages into #instructionsbox
        }
    }
    xhr.send();
}


window.onload = load_vmis;
window.onload = load_instructions;
