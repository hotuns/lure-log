export interface Radar {
  animID: number | null;
  points: { x: number; y: number }[];
  addPoints(x: number, y: number): void;
  clear(): void;
  scan(): void;
  stopScan(): void;
}

export function initRadarCanvas(canvasID: HTMLCanvasElement): Radar | null {
  let animID: number | null = null;
  const canvas = canvasID;

  if (!canvas) {
    console.log(`[error] cannot find canvas element`);
    return null;
  }

  if (!canvas.getContext) {
    console.log("[error] getContext is undefined");
    return null;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.log("[error] Failed to get canvas context");
    return null;
  }

  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * 0.9;

  const drawPoint = (x: number, y: number, n: number): void => {
    ctx.lineWidth = 1;
    for (let i = n; i > 0; i--) {
      ctx.beginPath();
      ctx.arc(x, y, n - i, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(42,195,39,${i / n})`;
      ctx.stroke();
    }
  };

  const drawCircle = (
    r: number,
    lineWidth: number = 1,
    color: string = "#090"
  ): void => {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const drawSector = (sAngle: number, eAngle: number): void => {
    let blob = 50;
    let increase = 0;

    if (sAngle < eAngle) {
      increase = (eAngle - sAngle) / blob;
    } else if (sAngle > eAngle) {
      increase = (Math.PI * 2 - sAngle + eAngle) / blob;
    } else {
      return;
    }

    let angle1 = sAngle;
    let angle2 = sAngle + increase;
    for (let i = 0; i < blob; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle1, angle2);
      ctx.fillStyle = `rgba(42,195,39,${i / blob})`;
      ctx.fill();
      angle1 = angle2;
      angle2 = angle1 + increase;
      if (angle2 >= Math.PI * 2) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle1, Math.PI * 2);
        ctx.fillStyle = `rgba(42,195,39,${i / blob})`;
        ctx.fill();
        angle1 = 0;
        angle2 = angle1 + increase;
      }
    }
  };

  const Line = (
    x: number,
    y: number,
    lineDash: number[] = [],
    color: string = "#396a00",
    lineWidth: number = 1
  ): void => {
    ctx.beginPath();
    ctx.setLineDash(lineDash);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const init = (): void => {
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, cWidth, cHeight);
    for (let i = 1; i <= 8; i++) {
      Line(
        centerX + Math.sin((Math.PI * i) / 4) * radius,
        centerY + Math.cos((Math.PI * i) / 4) * radius,
        [5, 3],
        "#396a00"
      );
    }
    for (let i = 1; i <= 15; ) {
      Line(
        centerX + Math.sin((Math.PI * i) / 8) * radius,
        centerY + Math.cos((Math.PI * i) / 8) * radius,
        [],
        "#062807"
      );
      i += 2;
    }

    drawCircle(0.9 * centerY, 2.5);
    drawCircle(0.8 * centerY, 2.5, "#042906");
    drawCircle(0.6 * centerY);
    drawCircle(0.3 * centerY);
  };

  return {
    animID: null,
    points: [
      { x: cWidth / 3, y: (cHeight * 3) / 7 },
      { x: (cWidth * 4) / 5, y: (cHeight * 6) / 9 },
    ],
    addPoints(x: number, y: number): void {
      this.points.push({ x, y });
    },
    clear(): void {
      if (animID !== null) {
        cancelAnimationFrame(animID); // Stop animation
      }
      ctx.clearRect(0, 0, cWidth, cHeight); // Clear canvas
      this.points = [
        { x: cWidth / 3, y: (cHeight * 3) / 7 },
        { x: (cWidth * 4) / 5, y: (cHeight * 6) / 9 },
      ]; // Reset default points
    },
    scan(): void {
      let angle = Math.PI / 4;
      let scanBegin = 0;
      let scanEnd = angle;
      let pointRadius = 1;
      const move = (): void => {
        ctx.clearRect(0, 0, cWidth, cHeight); // Clear canvas
        init(); // Redraw background
        drawSector(scanBegin, scanEnd); // Draw sector scan area
        this.points.forEach((p) => {
          drawPoint(p.x, p.y, pointRadius); // Draw glowing point
        });
        pointRadius += 0.08;
        scanBegin += angle / 25;
        scanEnd = scanBegin + angle;
        if (scanBegin >= Math.PI * 2) {
          scanBegin = 0;
          scanEnd = scanBegin + angle;
        }
        if (pointRadius >= 7) pointRadius = 0;
        animID = window.requestAnimationFrame(move);
      };

      animID = window.requestAnimationFrame(move);
    },
    stopScan(): void {
      if (animID !== null) {
        cancelAnimationFrame(animID);
      }
    },
  };
}
