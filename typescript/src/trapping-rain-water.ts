function trap(height: number[]): number {
  let result = 0;

  height.forEach((h, i) => {
    let leftMax = 0;
    let rightMax = 0;

    for (let j = i - 1; j >= 0; j--) {
      leftMax = Math.max(leftMax, height[j]);
    }
    for (let j = i + 1; j < height.length; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }

    result += Math.max(Math.min(leftMax, rightMax) - h, 0);
  });
  return result;
};


function trap2(height: number[]): number {
  const maxLeft: number[] = Array(height.length);
  const maxRight: number[] = Array(height.length);

  maxLeft[0] = height[0];
  maxRight[height.length-1] = height[height.length-1];

  for (let i = 1; i < height.length; i++) {
    maxLeft[i] = Math.max(height[i], maxLeft[i-1]);
  }

  for (let i = height.length - 2; i >= 0; i--) {
    maxRight[i] = Math.max(height[i], maxRight[i + 1]);
  }

  let result = 0;
  for (let i = 1; i < height.length - 1; i++) {
    result += Math.min(maxLeft[i], maxRight[i]) - height[i];
  }

  return result;
}

function trap3(height: number[]): number {
  let i = 0;
  let j = height.length - 1;

  let leftMax = 0;
  let rightMax = 0;

  let result = 0;
  while (i < j) {
    if (height[i] < height[j]) {
      if (height[i] >= leftMax) {
        leftMax = height[i];
      } else {
        result += leftMax - height[i];
      }

      i++;
    } else {
      if (height[j] >= rightMax) {
        rightMax = height[j];
      } else {
        result += rightMax - height[j];
      }

      j--;
    }
  }

  return result;
}