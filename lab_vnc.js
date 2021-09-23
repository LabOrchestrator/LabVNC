function load_other_vmi(vmi) {
    var params = new URLSearchParams(window.location.search);
    console.log(vmi);
    var path = params.get("path").split("/");
    path[1] = vmi;
    params.set("path", path.join("/"));
    history.replaceState(null, null, "?"+params.toString());
    window.location.search = "?" + params.toString();
}
function load_vmis() {
    var params = new URLSearchParams(window.location.search);
    var allowed_vmis = params.get("allowed_vmis").split(",");
    var path = params.get("path").split("/");
    var current_vmi = path[1];
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
window.onload = load_vmis;
