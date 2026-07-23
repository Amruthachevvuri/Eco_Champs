import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MascotVideoPlayer from "@/components/lesson/MascotVideoPlayer";
import ConversationPanel from "@/components/lesson/ConversationPanel";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import lesson1Video from "@/assets/lesson-1-trees.mp4.asset.json";
import lesson2Video from "@/assets/lesson-2-water.mp4.asset.json";
import lesson3Video from "@/assets/lesson-3-composting.mp4.asset.json";

type ConversationItem = {
  speaker: "chikku" | "bittu";
  text: string;
  timestamp: number;
  thought?: { icon: string; label: string }[];
};

const lessonData: Record<number, {
  title: string;
  duration: string;
  videoSrc: string;
  conversation: ConversationItem[];
}> = {
  1: {
    title: "Why Trees Matter",
    duration: "5 min",
    videoSrc: lesson1Video.url,
    conversation: [
      { speaker: "chikku", text: "Hey everyone! Today we're going to learn about why trees are so important for our planet!", timestamp: 0 },
      { speaker: "bittu", text: "Trees? They're just big sticks with leaves, right?", timestamp: 5 },
      { speaker: "chikku", text: "Haha, not quite Bittu! Trees are the lungs of our Earth. They absorb carbon dioxide and release oxygen that we breathe!", timestamp: 10, thought: [{ icon: "🌬️", label: "CO₂ in" }, { icon: "🌳", label: "Tree" }, { icon: "💨", label: "O₂ out" }] },
      { speaker: "bittu", text: "Wait… so trees literally help us breathe?! That's amazing!", timestamp: 18 },
      { speaker: "chikku", text: "Exactly! A single large tree can provide a day's oxygen for up to 4 people. Plus, trees cool the air and prevent soil erosion.", timestamp: 22, thought: [{ icon: "🧊", label: "Cool air" }, { icon: "🏔️", label: "Soil safe" }, { icon: "🐦", label: "Homes" }] },
      { speaker: "bittu", text: "So when people cut down forests, all those animals lose their homes? That's sad…", timestamp: 30 },
      { speaker: "chikku", text: "It is. That's why reforestation — planting new trees — is so important. Every tree we plant makes a difference!", timestamp: 35, thought: [{ icon: "🌱", label: "Plant" }, { icon: "🌿", label: "Grow" }, { icon: "🌳", label: "Forest!" }] },
      { speaker: "bittu", text: "I want to plant a tree now! Can we do that as our eco-task?", timestamp: 43 },
    ],
  },
  2: {
    title: "Water – Our Lifeline",
    duration: "5 min",
    videoSrc: lesson2Video.url,
    conversation: [
      { speaker: "chikku", text: "Today's lesson is about water — the most precious resource on Earth!", timestamp: 0 },
      { speaker: "bittu", text: "Water is everywhere though! Oceans, rivers, rain… why worry about it?", timestamp: 5 },
      { speaker: "chikku", text: "Only 2.5% of Earth's water is freshwater, and less than 1% is available for us to use!", timestamp: 10, thought: [{ icon: "🌊", label: "97.5% salt" }, { icon: "🧊", label: "1.5% ice" }, { icon: "💧", label: "<1% us" }] },
      { speaker: "bittu", text: "WHAT?! Only 1%?! I waste so much water brushing my teeth…", timestamp: 18 },
      { speaker: "chikku", text: "Turning off the tap while brushing can save up to 8 gallons of water per day!", timestamp: 22, thought: [{ icon: "🚿", label: "Tap off" }, { icon: "💧", label: "8 gal/day" }, { icon: "✅", label: "Saved!" }] },
      { speaker: "bittu", text: "I'm definitely going to start doing that. What else can we do?", timestamp: 30 },
      { speaker: "chikku", text: "Take shorter showers, fix leaky faucets, and collect rainwater for plants!", timestamp: 34, thought: [{ icon: "🚿", label: "Short shower" }, { icon: "🔧", label: "Fix leaks" }, { icon: "🪣", label: "Rainwater" }] },
    ],
  },
  3: {
    title: "The Magic of Composting",
    duration: "5 min",
    videoSrc: lesson3Video.url,
    conversation: [
      { speaker: "chikku", text: "Let's talk about composting — turning waste into treasure!", timestamp: 0 },
      { speaker: "bittu", text: "Eww, you mean rotting food? That sounds gross!", timestamp: 5 },
      { speaker: "chikku", text: "Composting is nature's recycling! Food scraps and garden waste break down into rich soil.", timestamp: 10, thought: [{ icon: "🍌", label: "Scraps" }, { icon: "🪱", label: "Worms" }, { icon: "🌱", label: "Soil!" }] },
      { speaker: "bittu", text: "So trash becomes… magic dirt?", timestamp: 18 },
      { speaker: "chikku", text: "This compost is packed with nutrients that help plants grow stronger — no chemicals needed!", timestamp: 22, thought: [{ icon: "💪", label: "Nutrients" }, { icon: "🌿", label: "Healthy" }, { icon: "🚫", label: "No chemicals" }] },
      { speaker: "bittu", text: "That's actually really cool! So instead of throwing food in the trash…", timestamp: 30 },
      { speaker: "chikku", text: "You compost it! This reduces methane from landfills — a gas 25x more potent than CO₂!", timestamp: 34, thought: [{ icon: "🏭", label: "Methane" }, { icon: "📉", label: "25x less" }, { icon: "🌍", label: "Earth safe" }] },
      { speaker: "bittu", text: "Whoa! I'm going to start a compost bin at home!", timestamp: 42 },
    ],
  },
};

const LessonDetail = () => {
  const { id } = useParams();
  const lessonId = Number(id);
  const lesson = lessonData[lessonId];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeMessages, setActiveMessages] = useState<number[]>([0]);
  const [videoProgress, setVideoProgress] = useState(0);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [isTTSSpeaking, setIsTTSSpeaking] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<"chikku" | "bittu" | null>(null);
  const lastSpokenIndex = useRef(-1);
  const pausedForSpeech = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { speak, cancel } = useSpeechSynthesis();

  // Speak dialogue when new message appears
  const speakMessage = useCallback((msg: ConversationItem, msgIndex: number) => {
    setCurrentSpeaker(msg.speaker);
    setIsTTSSpeaking(true);
    pausedForSpeech.current = true;
    speak({
      text: msg.text,
      speaker: msg.speaker,
      onEnd: () => {
        setIsTTSSpeaking(false);
        setCurrentSpeaker(null);
        pausedForSpeech.current = false;
        // Jump time to next message's timestamp immediately (no gap)
        if (lesson) {
          const nextMsg = lesson.conversation[msgIndex + 1];
          if (nextMsg) {
            setCurrentTime(nextMsg.timestamp);
          }
        }
      },
    });
  }, [speak, lesson]);

  useEffect(() => {
    if (!lesson || !isPlaying) return;

    timerRef.current = setInterval(() => {
      // Don't advance time while TTS is still speaking
      if (pausedForSpeech.current) return;

      setCurrentTime((prev) => {
        const next = prev + 0.5;
        const newMessages = lesson.conversation
          .map((msg, i) => (msg.timestamp <= next ? i : -1))
          .filter((i) => i !== -1);
        setActiveMessages(newMessages);

        // Trigger TTS for new messages
        const latestIdx = newMessages[newMessages.length - 1];
        if (latestIdx !== undefined && latestIdx > lastSpokenIndex.current) {
          lastSpokenIndex.current = latestIdx;
          speakMessage(lesson.conversation[latestIdx], latestIdx);
        }

        const maxTimestamp = Math.max(...lesson.conversation.map((c) => c.timestamp));
        const progress = Math.min((next / (maxTimestamp + 5)) * 100, 100);
        setVideoProgress(progress);

        if (progress >= 100) {
          setIsPlaying(false);
          setLessonComplete(true);
        }
        return next;
      });
    }, 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, lesson, speakMessage]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      cancel();
      setIsTTSSpeaking(false);
      setCurrentSpeaker(null);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, cancel]);

  const currentSpeakerIndex = lesson
    ? lesson.conversation.reduce((acc, msg, i) => (msg.timestamp <= currentTime ? i : acc), 0)
    : 0;

  if (!lesson) {
    return (
      <div className="space-y-6 text-center py-20">
        <h1 className="font-display text-2xl font-900 text-foreground">Lesson not found</h1>
        <Button asChild><Link to="/learn">← Back to Lessons</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link to="/learn"><ArrowLeft size={20} /></Link>
        </Button>
        <div>
          <h1 className="font-display text-2xl font-900 text-foreground">{lesson.title}</h1>
          <p className="text-muted-foreground text-sm">{lesson.duration} lesson with Chikku & Bittu • 🔊 Voice enabled</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <MascotVideoPlayer
          conversation={lesson.conversation}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          currentTime={currentTime}
          progress={videoProgress}
          
          isSpeaking={isTTSSpeaking}
          currentSpeaker={currentSpeaker}
        />
      </Card>

      <ConversationPanel
        conversation={lesson.conversation}
        activeMessages={activeMessages}
        currentSpeaker={currentSpeakerIndex}
        isPlaying={isPlaying}
        lessonComplete={lessonComplete}
      />

      {lessonComplete && (
        <Card className="gradient-forest text-primary-foreground">
          <CardContent className="p-6 text-center space-y-3">
            <h3 className="font-display text-xl font-bold">Great job finishing this lesson! 🎉</h3>
            <p className="text-primary-foreground/80 text-sm">
              Now test your knowledge with a quiz based on what you just learned.
            </p>
            <Button asChild className="bg-primary-foreground text-primary font-bold">
              <Link to={`/quiz?lesson=${lessonId}`}>Take the Quiz →</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonDetail;
