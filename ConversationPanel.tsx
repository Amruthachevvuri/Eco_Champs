import { useEffect, useRef } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import chikkuImg from "@/assets/chikku-mascot.png";
import bittuImg from "@/assets/bittu-mascot.png";

interface ConversationItem {
  speaker: "chikku" | "bittu";
  text: string;
  timestamp: number;
  thought?: { icon: string; label: string }[];
}

interface ConversationPanelProps {
  conversation: ConversationItem[];
  activeMessages: number[];
  currentSpeaker: number;
  isPlaying: boolean;
  lessonComplete: boolean;
}

const ConversationPanel = ({
  conversation,
  activeMessages,
  currentSpeaker,
  isPlaying,
  lessonComplete,
}: ConversationPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle size={18} className="text-primary" />
          <h3 className="font-display font-bold text-foreground">Chikku & Bittu Explain</h3>
          {!isPlaying && !lessonComplete && (
            <Badge variant="outline" className="ml-auto text-xs">Press play to start</Badge>
          )}
          {lessonComplete && (
            <Badge className="ml-auto gradient-forest text-primary-foreground text-xs">
              <CheckCircle2 size={12} className="mr-1" /> Completed!
            </Badge>
          )}
        </div>

        <div ref={scrollRef} className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {conversation.map((msg, i) => {
            if (!activeMessages.includes(i)) return null;
            const isChikku = msg.speaker === "chikku";
            const isCurrent = i === currentSpeaker;

            return (
              <div
                key={i}
                className={`flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 transition-opacity ${
                  isChikku ? "" : "flex-row-reverse"
                } ${isCurrent ? "opacity-100" : "opacity-60"}`}
              >
                <img
                  src={isChikku ? chikkuImg : bittuImg}
                  alt={isChikku ? "Chikku" : "Bittu"}
                  className={`w-10 h-10 rounded-full object-cover shrink-0 border-2 ${
                    isCurrent ? "border-primary ring-2 ring-primary/30" : "border-primary/20"
                  }`}
                />
                <div
                  className={`rounded-2xl p-3 max-w-[80%] ${
                    isChikku
                      ? "bg-primary/10 rounded-tl-sm"
                      : "bg-secondary/10 rounded-tr-sm"
                  } ${isCurrent ? "shadow-md" : ""}`}
                >
                  <p className="text-xs font-display font-bold text-muted-foreground mb-1">
                    {isChikku ? "Chikku 🌳" : "Bittu 🐿️"}
                  </p>
                  <p className="text-sm text-foreground">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationPanel;
