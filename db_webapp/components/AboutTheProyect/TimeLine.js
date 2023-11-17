   
  export function BiomxDBTimeline() {
    const items = [{
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText:"Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      contentDetailedText: "On 10 May 1940, Hitler began his long-awaited offensive in the west...",
    },{
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText:"Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      contentDetailedText: "On 10 May 1940, Hitler began his long-awaited offensive in the west...",
    }];

    return (
        <div style={{ width: "500px", height: "400px" }}>
          <chrono items={items} />
        </div>
    );
  }