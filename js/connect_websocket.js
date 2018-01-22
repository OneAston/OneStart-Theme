function webSocketStart(contextPath)
{
    var isFreshWebSocket = setupWebSocketObject(contextPath);

    var ws = getVariable('', "websocketObject", undefined);
    if (ws)
    {
        if (isFreshWebSocket)
        {
            configureWebSocketObject(ws, webSocketRuleList);
        }
        else
        {
            ws.send(webSocketRuleList);
        }
    }

    return ws;
}

function setupWebSocketObject(contextId)
{
    var websocketObject = getVariable('', "websocketObject", undefined);
    if (!websocketObject)
    {
        var location = window.location;

        var hostname = location.hostname;
        var port = location.port;
        if (!contextId)
        {
            return;
        }
        var pathname = contextId + "/websocketcontroller";
        var protocol = location.protocol;
        if (protocol === "http:")
        {
            protocol = "ws:";
        }
        else if (protocol === "https:")
        {
            protocol = "wss:";
        }
        var fullURL = protocol + "//" + hostname + (port ? ":" + port : "") + pathname;

        websocketObject = new WebSocket(fullURL);
        setVariable('', "websocketObject", websocketObject);

        return true;
    }
    return false;
}

function configureWebSocketObject(ws, wsRuleList)
{
    ws.onopen = function ()
    {
        ws.send(wsRuleList);
    };

    ws.onmessage = function (evt)
    {
        var objData = JSON.parse(evt.data);
        processAjaxResponses("", "ajaxQLR", true, objData);
    };
}

function mergeAllWebSocketParams()
{
    var wsParams = webSocketRuleList;
    var mergedParam = {};

    if (!wsParams || !wsParams[0])
    {
        return mergedParam;
    }
    mergedParam["sessionid"] = wsParams[0]["sessionid"];
    mergedParam["contextid"] = wsParams[0]["contextid"];
    mergedParam["phaseids"] = [];
    mergedParam["ruleids"] =  {};

    webSocketRuleList.reduce(merge, mergedParam);

    return mergedParam;
}

function merge(merged, current)
{
    for(var i = 0; i < current.phaseids.length; i++)
    {
        merged["phaseids"].push(current.phaseids[i]);
    }

    for (var key in current["ruleids"])
    {
        merged["ruleids"][key] = current["ruleids"][key];
    }
    return merged;
}

function addToWebsocketRuleList(newRuleId) {
    webSocketRuleList = [];
    webSocketRuleList[0] = newRuleId;
    webSocketStart();
}
