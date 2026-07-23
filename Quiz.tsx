import { useState } from "react";
import { Brain, Lightbulb, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import bittuMascot from "@/assets/bittu-mascot.png";

const quizQuestions = [
  {
    id: 1,
    question: "What process do trees use to make food from sunlight?",
    options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
    correct: 1,
    bittuDoubt: "Bittu thinks trees order food online 🍕",
    explanation: "Trees use photosynthesis — converting sunlight, water, and CO₂ into glucose and oxygen!",
  },
  {
    id: 2,
    question: "Which gas do trees release that we need to breathe?",
    options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"],
    correct: 2,
    bittuDoubt: "Bittu says trees release WiFi signals 📡",
    explanation: "Trees release oxygen during photosynthesis — the very air we breathe!",
  },
  {
    id: 3,
    question: "How do trees help prevent soil erosion?",
    options: ["By dancing in the wind", "Their roots hold the soil", "They scare the rain away", "They absorb all the water"],
    correct: 1,
    bittuDoubt: "Bittu thinks the soil just likes trees and stays put 😄",
    explanation: "Tree roots create a network that binds soil together, preventing it from washing away!",
  },
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showDoubt, setShowDoubt] = useState(true);

  const q = quizQuestions[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
    setShowResult(true);
  };

  const next = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setShowDoubt(true);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="font-display text-3xl font-900 text-foreground">Quiz Complete!</h1>
        <p className="text-muted-foreground">
          You scored <span className="text-primary font-bold">{score}</span> out of{" "}
          <span className="font-bold">{quizQuestions.length}</span>
        </p>
        <div className="flex gap-3">
          <Badge className="gradient-forest text-primary-foreground px-4 py-2 text-sm">
            +{score * 10} Points Earned
          </Badge>
        </div>
        <Button onClick={() => { setCurrent(0); setSelected(null); setShowResult(false); setScore(0); setFinished(false); setShowDoubt(true); }} variant="outline" className="rounded-xl">
          Retry Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-900 text-foreground">Quiz</h1>
        <p className="text-muted-foreground text-sm mt-1">Lesson: Why Trees Matter 🌳</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Brain size={16} />
        Question {current + 1} of {quizQuestions.length}
      </div>

      {/* Bittu's Doubt Mode */}
      {showDoubt && (
        <Card className="border-secondary/30 bg-secondary/5">
          <CardContent className="p-4 flex items-start gap-3">
            <img src={bittuMascot} alt="Bittu" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-xs font-bold text-secondary mb-1 flex items-center gap-1">
                <Lightbulb size={12} /> Bittu's Doubt Mode
              </p>
              <p className="text-sm text-foreground italic">"{q.bittuDoubt}"</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">{q.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                selected === null
                  ? "border-border hover:border-primary hover:bg-primary/5"
                  : idx === q.correct
                  ? "border-primary bg-primary/10 text-primary"
                  : idx === selected
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border opacity-50"
              }`}
            >
              <span className="flex items-center gap-2">
                {showResult && idx === q.correct && <CheckCircle2 size={16} />}
                {showResult && idx === selected && idx !== q.correct && <XCircle size={16} />}
                {opt}
              </span>
            </button>
          ))}

          {showResult && (
            <div className="mt-4 p-3 rounded-xl bg-muted text-sm text-muted-foreground">
              💡 {q.explanation}
            </div>
          )}

          {showResult && (
            <Button onClick={next} className="w-full gradient-forest text-primary-foreground rounded-xl mt-2">
              {current < quizQuestions.length - 1 ? (
                <span className="flex items-center gap-2">Next <ArrowRight size={16} /></span>
              ) : "See Results"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
