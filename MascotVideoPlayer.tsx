import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import chikkuImg from "@/assets/chikku-mascot.png";
import bittuImg from "@/assets/bittu-mascot.png";

interface ConversationItem {
  speaker: "chikku" | "bittu";
  text: string;
  timestamp: number;
  thought?: { icon: string; label: string }[];
}

interface MascotVideoPlayerProps {
  conversation: ConversationItem[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  progress: number;
  isSpeaking?: boolean;
  currentSpeaker?: "chikku" | "bittu" | null;
}

const ThoughtBubble = ({ thoughts }: { thoughts: { icon: string; label: string }[] }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-fade-in z-20">
    <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-border/50 relative">
      <div className="flex items-center gap-4">
        {thoughts.map((t, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-3xl animate-bounce" style={{ animationDelay: `${i * 200}ms` }}>{t.icon}</span>
            <span className="text-[10px] font-display font-bold text-muted-foreground">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card/90 border-b border-r border-border/50 rotate-45" />
    </div>
  </div>
);

const SpeechBubble = ({ text, side, isSpeaking }: { text: string; side: "left" | "right"; isSpeaking?: boolean }) => (
  <div
    className={`absolute max-w-[45%] animate-fade-in z-20 ${
      side === "left" ? "top-[8%] left-[5%]" : "top-[8%] right-[5%]"
    }`}
  >
    <div className={`bg-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border ${isSpeaking ? 'border-primary/60 ring-2 ring-primary/20' : 'border-border/40'} relative`}>
      <p className="text-xs sm:text-sm font-body text-foreground leading-snug">{text}</p>
      <div
        className={`absolute -bottom-1.5 ${
          side === "left" ? "left-8" : "right-8"
        } w-3 h-3 bg-card/95 border-b border-r border-border/40 rotate-45`}
      />
    </div>
  </div>
);

// Bittu waypoints near Chikku (close to center, never at borders)
const bittuWaypoints = [
  { left: "60%", bottom: "8%" },
  { left: "38%", bottom: "10%" },
  { left: "55%", bottom: "12%" },
  { left: "42%", bottom: "6%" },
  { left: "58%", bottom: "15%" },
  { left: "36%", bottom: "12%" },
  { left: "62%", bottom: "8%" },
  { left: "40%", bottom: "10%" },
];

const MascotVideoPlayer = ({
  conversation,
  isPlaying,
  onTogglePlay,
  currentTime,
  progress,
  isSpeaking: isTTSSpeaking,
  currentSpeaker,
}: MascotVideoPlayerProps) => {
  const [showControls, setShowControls] = useState(true);
  const [bittuIdx, setBittuIdx] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload mascot images
  useEffect(() => {
    const imgs = [chikkuImg, bittuImg];
    let loaded = 0;
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === imgs.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === imgs.length) setImagesLoaded(true);
      };
      if (img.complete) {
        loaded++;
        if (loaded === imgs.length) setImagesLoaded(true);
      }
    });
  }, []);

  const activeMsgIndex = conversation.reduce(
    (acc, msg, i) => (msg.timestamp <= currentTime ? i : acc),
    0
  );
  const activeMsg = conversation[activeMsgIndex];
  const isChikkuSpeaking = activeMsg?.speaker === "chikku";
  const isBittuSpeaking = activeMsg?.speaker === "bittu";

  // Bittu free-roaming: moves every 2-4 seconds
  useEffect(() => {
    if (!isPlaying) return;
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleMove = () => {
      const delay = 2000 + Math.random() * 2000;
      timeout = setTimeout(() => {
        setBittuIdx((prev) => {
          let next = Math.floor(Math.random() * bittuWaypoints.length);
          while (next === prev) next = Math.floor(Math.random() * bittuWaypoints.length);
          return next;
        });
        scheduleMove();
      }, delay);
    };
    scheduleMove();
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  // Auto-hide controls
  useEffect(() => {
    if (!isPlaying) { setShowControls(true); return; }
    const timeout = setTimeout(() => setShowControls(false), 2000);
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const bittuPos = bittuWaypoints[bittuIdx];
  
  // Flip only the image to face Chikku, not the whole container
  const bittuLeftNum = parseFloat(bittuPos.left);
  const facingChikkuImg = bittuLeftNum > 50 ? "scaleX(-1)" : "scaleX(1)";

  return (
    <div
      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(180deg, hsl(200 70% 75%) 0%, hsl(200 50% 88%) 40%, hsl(120 30% 75%) 70%, hsl(120 40% 55%) 100%)"
      }}
      onClick={() => setShowControls(true)}
    >
      {/* Animated nature background - clean & simple */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Clouds */}
        <div className="absolute top-[8%] left-[5%] text-4xl opacity-50" style={{ animation: "float-cloud 14s ease-in-out infinite" }}>☁️</div>
        <div className="absolute top-[12%] right-[10%] text-3xl opacity-40" style={{ animation: "float-cloud 18s ease-in-out infinite 4s" }}>☁️</div>
        <div className="absolute top-[5%] left-[50%] text-2xl opacity-30" style={{ animation: "float-cloud 20s ease-in-out infinite 8s" }}>☁️</div>
        
        {/* Sun */}
        <div className="absolute top-[6%] right-[5%] text-5xl opacity-70" style={{ animation: "float 6s ease-in-out infinite" }}>☀️</div>
        
        {/* Ground elements */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[hsl(120_40%_35%)] via-[hsl(120_35%_45%)] to-transparent" />
        <div className="absolute bottom-[2%] left-[10%] text-2xl">🌿</div>
        <div className="absolute bottom-[1%] left-[30%] text-xl">🌱</div>
        <div className="absolute bottom-[3%] right-[35%] text-xl">🌻</div>
        <div className="absolute bottom-[1%] right-[15%] text-lg">🍃</div>
        <div className="absolute bottom-[2%] left-[55%] text-xl">🌾</div>
      </div>

      {/* Thought bubble when Chikku explains */}
      {activeMsg?.thought && isChikkuSpeaking && (
        <ThoughtBubble thoughts={activeMsg.thought} />
      )}

      {/* Chikku (Teacher - centered, big) */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <img
          src={chikkuImg}
          alt="Chikku the Tree Teacher"
          loading="eager"
          decoding="async"
          className={`w-48 h-48 sm:w-72 sm:h-72 object-contain drop-shadow-xl transition-all duration-300 ${
            isChikkuSpeaking ? "scale-105" : "scale-95 opacity-85"
          }`}
          style={isChikkuSpeaking && isTTSSpeaking ? { animation: "mascot-talk 0.3s ease-in-out infinite" } : {}}
        />
        <span className="text-[10px] sm:text-xs font-display font-bold text-white mt-1 bg-black/40 rounded-full px-2 py-0.5">
          Chikku 🌳
          {isChikkuSpeaking && isTTSSpeaking && <span className="ml-1">🔊</span>}
        </span>
      </div>

      {/* Bittu (Free-roaming, large, playful) */}
      <div
        className="absolute flex flex-col items-center z-10 pointer-events-none"
        style={{
          left: bittuPos.left,
          bottom: bittuPos.bottom,
          transform: "translateX(-50%)",
          transition: "all 2.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="relative">
          <img
            src={bittuImg}
            alt="Bittu the Squirrel"
            loading="eager"
            decoding="async"
            className={`w-28 h-28 sm:w-40 sm:h-40 object-contain drop-shadow-lg transition-all duration-300 ${
              isBittuSpeaking ? "scale-110" : ""
            }`}
            style={{
              transform: facingChikkuImg,
              animation: isBittuSpeaking && isTTSSpeaking
                ? "mascot-talk 0.3s ease-in-out infinite"
                : isPlaying
                ? "bittu-idle 3s ease-in-out infinite"
                : "none",
            }}
          />
        </div>
        <span className="text-[10px] sm:text-xs font-display font-bold text-white mt-1 bg-black/40 rounded-full px-2 py-0.5">
          Bittu 🐿️
          {isBittuSpeaking && isTTSSpeaking && <span className="ml-1">🔊</span>}
        </span>
      </div>


      {/* Play/Pause controls */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          size="lg"
          onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
          className="rounded-full w-14 h-14 gradient-forest text-primary-foreground shadow-leaf hover:scale-110 transition-transform"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
        </Button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Progress value={progress} className="h-1.5 rounded-none" />
      </div>
    </div>
  );
};

export default MascotVideoPlayer;
