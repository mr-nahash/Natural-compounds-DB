   
  import React from "react";
  import { Chrono } from "react-chrono";

  export function BiomxDBTimeline() {
    const items = [{
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText:"Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      contentDetailedText: "On 10 May 1940, Hitler began his long-awaited offensive in the west...",
      media: {
        type: "IMAGE",
        source: {
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2FDIFACQUIM&psig=AOvVaw1CHe1jm7VGPvvtbHpYjlFR&ust=1704767541901000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODXwpDgzIMDFQAAAAAdAAAAABAD"
        },
        
      }
    },{
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText:"Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      contentDetailedText: "On 10 May 1940, Hitler began his long-awaited offensive in the west...",
    }];

    return (
        <div style={{ width: "500px", height: "400px" }}>
          <Chrono 
            items={items}
            mediaSettings={{ align: 'right', fit: 'contain' }}
            scrollable
            textOverlay 
          />
        </div>
    );
  }