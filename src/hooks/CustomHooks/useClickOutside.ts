import { RefObject, useEffect, useRef, useCallback } from 'react';

/**
 * Hook that handles click/touch events outside of a specified element
 * @param ref - Reference to the element to detect clicks outside of
 * @param handler - Callback function to execute when a click outside occurs
 * @param eventType - Event type to listen for ('mousedown' or 'touchstart')
 * @param eventListenerOptions - Options for the event listener
 */
export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: 'mousedown' | 'touchstart' = 'mousedown',
  eventListenerOptions: boolean | AddEventListenerOptions = false,
) {
  // Store the handler in a ref to avoid unnecessary effect re-runs
  const handlerRef = useRef(handler);
  
  // Update the ref when the handler changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  // Create a memoized event listener
  const listener = useCallback((event: MouseEvent | TouchEvent | FocusEvent) => {
    // Guard clauses for better readability
    if (!ref.current) return;
    
    const target = event.target;
    if (!target || !(target instanceof Node) || !target.isConnected) return;
    
    // Check if click was outside the referenced element
    if (!ref.current.contains(target as Node)) {
      handlerRef.current(event);
    }
  }, [ref]);

  useEffect(() => {
    // Add event listener
    window.addEventListener(eventType, listener, eventListenerOptions);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener(eventType, listener, eventListenerOptions);
    };
  }, [ref, eventType, eventListenerOptions, listener]);
}