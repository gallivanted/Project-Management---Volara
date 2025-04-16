import React from 'react';

/**
 * A higher-order component that wraps a component with React.memo for performance optimization.
 * This prevents unnecessary re-renders when props haven't changed.
 * 
 * @param {React.ComponentType} Component - The component to be optimized
 * @param {Function} propsAreEqual - Optional custom comparison function
 * @returns {React.MemoExoticComponent} - Memoized component
 */
export const withMemoization = (Component, propsAreEqual = null) => {
  // Use custom comparison function if provided, otherwise use default shallow comparison
  return React.memo(Component, propsAreEqual);
};

/**
 * A custom props comparison function that performs deep comparison for specific props
 * 
 * @param {Object} prevProps - Previous props
 * @param {Object} nextProps - Next props
 * @param {Array} deepCompareProps - Array of prop names to deep compare
 * @returns {boolean} - Whether props are equal
 */
export const createDeepPropsComparator = (deepCompareProps = []) => {
  return (prevProps, nextProps) => {
    // First check if any props not in the deepCompareProps list have changed
    const shallowProps = Object.keys(prevProps).filter(
      key => !deepCompareProps.includes(key)
    );
    
    for (const prop of shallowProps) {
      if (prevProps[prop] !== nextProps[prop]) {
        return false;
      }
    }
    
    // Then do deep comparison for the specified props
    for (const prop of deepCompareProps) {
      if (!deepEqual(prevProps[prop], nextProps[prop])) {
        return false;
      }
    }
    
    return true;
  };
};

/**
 * Deep equality comparison helper function
 */
const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
};

export default withMemoization;