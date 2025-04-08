'use client'

import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface BouncingDVDProps {
  imageUrl?: string;
}

export const BouncingDVD = ({ imageUrl = "/chuck.png" }: BouncingDVDProps) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef({ x: 0, y: 0, dx: 1, dy: 1 });
    const [explosion, setExplosion] = useState({ show: false, x: 0, y: 0 });
    const [cornerClicks, setCornerClicks] = useState({ count: 0, corner: "" });
  
    const handleCornerClick = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        const cornerSize = 50;
        const explosionSize = 150; // Size of explosion animation

        // Determine which corner was clicked
        const corner = 
            clientY < cornerSize && clientX < cornerSize ? "topLeft" :
            clientY < cornerSize && clientX > window.innerWidth - cornerSize ? "topRight" :
            clientY > window.innerHeight - cornerSize && clientX < cornerSize ? "bottomLeft" :
            clientY > window.innerHeight - cornerSize && clientX > window.innerWidth - cornerSize ? "bottomRight" : 
            null;

        if (corner) {
            setCornerClicks(prev => {
            const newCount = prev.corner === corner ? prev.count + 1 : 1;
            setTimeout(() => setCornerClicks({ count: 0, corner: "" }), 2000);
            
            if (newCount === 3) {
                // Calculate explosion position based on corner
                const explosionPos = {
                topLeft: { x: 0, y: 0 },
                topRight: { x: window.innerWidth - explosionSize, y: 0 },
                bottomLeft: { x: 0, y: window.innerHeight - explosionSize },
                bottomRight: { x: window.innerWidth - explosionSize, y: window.innerHeight - explosionSize }
                }[corner];

                setExplosion({ 
                show: true, 
                x: explosionPos.x,
                y: explosionPos.y
                });
                setTimeout(() => setExplosion({ show: false, x: 0, y: 0 }), 1000);
                return { count: 0, corner: "" };
            }
            
            return { count: newCount, corner };
            });
        }
    };
  
    useEffect(() => {
        let animationFrameId: number;
        const speed = 5;
    
        const animate = () => {
          if (!boxRef.current) return;
    
          const box = boxRef.current;
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight;
          const boxWidth = 100;
          const boxHeight = 100;
          const explosionSize = 150;
    
          let { x, y, dx, dy } = positionRef.current;
    
          x += speed * dx;
          y += speed * dy;
    
          // Check for corner collisions with small threshold
          const isCornerCollision = (
            (x <= 2 && y <= 2) || // Top-left
            (x + boxWidth >= containerWidth - 2 && y <= 2) || // Top-right
            (x <= 2 && y + boxHeight >= containerHeight - 2) || // Bottom-left
            (x + boxWidth >= containerWidth - 2 && y + boxHeight >= containerHeight - 2) // Bottom-right
          );
    
          // Handle corner collisions with explosion
          if (isCornerCollision) {
            let explosionX, explosionY;
    
            // Determine which corner was hit and position explosion accordingly
            if (x <= 2 && y <= 2) { // Top-left
              explosionX = 0;
              explosionY = 0;
            } else if (x + boxWidth >= containerWidth - 2 && y <= 2) { // Top-right
              explosionX = containerWidth - explosionSize;
              explosionY = 0;
            } else if (x <= 2 && y + boxHeight >= containerHeight - 2) { // Bottom-left
              explosionX = 0;
              explosionY = containerHeight - explosionSize;
            } else { // Bottom-right
              explosionX = containerWidth - explosionSize;
              explosionY = containerHeight - explosionSize;
            }
    
            setExplosion({ 
              show: true, 
              x: explosionX,
              y: explosionY 
            });
            setTimeout(() => setExplosion({ show: false, x: 0, y: 0 }), 1000);
          }
    
          // Regular wall bouncing
          if (x <= 0 || x + boxWidth >= containerWidth) {
            dx *= -1;
          }
          if (y <= 0 || y + boxHeight >= containerHeight) {
            dy *= -1;
          }
    
          // Update position
          positionRef.current = { x, y, dx, dy };
          box.style.transform = `translate(${x}px, ${y}px)`;
    
          animationFrameId = requestAnimationFrame(animate);
        };
    
        animate();
        return () => cancelAnimationFrame(animationFrameId);
      }, []);

      return (
        <>
          {/* Corner click areas */}
          {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((corner) => (
            <Box
              key={corner}
              onClick={handleCornerClick}
              sx={{
                position: "fixed",
                width: "50px",
                height: "50px",
                zIndex: 1000,
                ...(corner === 'topLeft' && { top: 0, left: 0 }),
                ...(corner === 'topRight' && { top: 0, right: 0 }),
                ...(corner === 'bottomLeft' && { bottom: 0, left: 0 }),
                ...(corner === 'bottomRight' && { bottom: 0, right: 0 }),
              }}
            />
          ))}
          
          {/* Bouncing DVD logo */}
          <Box
            ref={boxRef}
            sx={{
              position: "fixed",
              width: "100px",
              height: "100px",
              zIndex: -1,
              opacity: 0.7,
              img: {
                width: "100%",
                height: "100%",
                objectFit: "contain",
              },
            }}
          >
            <img src={imageUrl} alt="Bouncing DVD" />
          </Box>
    
          {/* Explosion effect */}
          {explosion.show && (
            <Box
              sx={{
                position: "fixed",
                left: explosion.x,
                top: explosion.y,
                width: "150px",
                height: "150px",
                zIndex: 1000,
                img: {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                },
              }}
            >
              <img src="/funnyExplosion.gif" alt="Explosion" />
            </Box>
          )}
        </>
    );
};