export const printEvent = (eventName, data, element) => {
    const event = new CustomEvent(eventName, {
      detail: data
    });
  
    element.dispatchEvent(event);
  }