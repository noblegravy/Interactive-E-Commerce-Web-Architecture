export const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div className="flex items-center cursor-pointer" onClick={onClick}>
    <svg viewBox="0 0 320 80" className="h-10 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left slanted bars */}
      <path d="M22 20 L10 60 L22 60 L34 20 Z" fill="white" />
      <path d="M40 20 L28 60 L40 60 L52 20 Z" fill="white" />
      
      {/* Circle */}
      <circle cx="76" cy="40" r="15" stroke="white" strokeWidth="10" />
      
      {/* Vertical Separator */}
      <rect x="104" y="15" width="2" height="50" fill="white" />
      
      {/* GAPR Text */}
      <text 
        x="116" 
        y="48" 
        fill="white" 
        fontFamily="Arial, system-ui, sans-serif" 
        fontWeight="900" 
        fontStyle="italic" 
        fontSize="44" 
        letterSpacing="-1"
      >
        GAPR
      </text>
      
      {/* PC SOLUTION Text */}
      <text 
        x="118" 
        y="62" 
        fill="white" 
        fontFamily="Arial, system-ui, sans-serif" 
        fontWeight="700" 
        fontSize="9.5" 
        letterSpacing="4.5"
      >
        PC SOLUTION
      </text>
    </svg>
  </div>
);
