import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  MessageSquare,
  Phone,
  Trophy,
  Target
} from 'lucide-react';
import { quizQuestions } from '../data/quiz';
import { CitationCard } from '../components/CitationCard';

type GameState = 'start' | 'playing' | 'feedback' | 'results';

function getResultTier(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) {
    return {
      title: 'Scam Spotter Expert',
      message:
        'You correctly identified every scenario. Share what you know with family and friends.',
      color: 'text-emerald-400',
      ring: 'border-emerald-500'
    };
  }
  if (pct >= 0.75) {
    return {
      title: 'Strong Awareness',
      message:
        'You catch most common tricks. Review the guides below to close any remaining gaps.',
      color: 'text-cyan-400',
      ring: 'border-cyan-500'
    };
  }
  if (pct >= 0.5) {
    return {
      title: 'Building Your Defenses',
      message:
        'You got several right, but scammers evolve fast. Practice with Athena and read our verified articles.',
      color: 'text-amber-400',
      ring: 'border-amber-500'
    };
  }
  return {
    title: 'Keep Learning',
    message:
      'Scams in the Philippines target everyone. Use our tools below — they are built from real PNP, DICT, and BSP advisories.',
    color: 'text-slate-300',
    ring: 'border-slate-500'
  };
}

export function Quiz() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  const question = quizQuestions[currentQuestionIndex];
  const total = quizQuestions.length;
  const progressPct = ((currentQuestionIndex + (gameState === 'feedback' ? 1 : 0)) / total) * 100;

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setGameState('feedback');
    if (index === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setGameState('playing');
    } else {
      setGameState('results');
    }
  };

  useEffect(() => {
    if (gameState !== 'results') return;
    const end = Math.round((score / total) * 100);
    let start = 0;
    const duration = 900;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [gameState, score, total]);

  const tier = getResultTier(score, total);

  return (
    <div className="bg-black text-slate-100 min-h-screen">
      <div className="border-b border-white/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 0%, rgba(34, 211, 238, 0.35), transparent 70%)'
          }}
        />
        <div className="container mx-auto px-4 py-12 md:py-16 relative max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
            <Target className="w-4 h-4" />
            Interactive Training
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Scam Awareness Quiz
          </h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Realistic scenarios from Philippine SMS scams, phishing, job fraud, and
            QR payment tricks — with official-source explanations after each answer.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="dark-panel rounded-2xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to test your instincts?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                Each question mirrors tactics reported by PNP-ACG, DICT, BSP, and
                PhilSys. Wrong answers show why — with a source you can verify.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mb-8">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {total} questions
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  ~{Math.ceil(total * 0.75)} min
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  PH-focused
                </span>
              </div>
              <button
                type="button"
                onClick={handleStart}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-medium rounded-xl transition-all inline-flex items-center gap-2">
                Start Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {(gameState === 'playing' || gameState === 'feedback') && (
            <motion.div
              key={`q-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>
                    Question {currentQuestionIndex + 1} of {total}
                  </span>
                  <span className="font-medium text-white">
                    Score: {score}/{total}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="dark-panel rounded-2xl p-6 md:p-8 mb-6">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full mb-4">
                  {question.category}
                </span>
                <h2 className="text-xl font-medium text-white mb-6 leading-relaxed">
                  {question.scenario}
                </h2>
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    let buttonStyle =
                      'bg-zinc-900 border-white/10 hover:border-cyan-500/50 hover:bg-white/5 text-slate-300';
                    if (gameState === 'feedback') {
                      if (index === question.correctAnswer) {
                        buttonStyle =
                          'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
                      } else if (
                        index === selectedAnswer &&
                        index !== question.correctAnswer
                      ) {
                        buttonStyle = 'bg-red-500/10 border-red-500/30 text-red-400';
                      } else {
                        buttonStyle =
                          'bg-zinc-900 border-white/5 text-slate-600 opacity-50';
                      }
                    }
                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={gameState === 'feedback'}
                        onClick={() => handleAnswer(index)}
                        className={`w-full text-left p-4 rounded-xl border transition-colors ${buttonStyle} flex items-center justify-between gap-3`}>
                        <span>{option}</span>
                        {gameState === 'feedback' &&
                          index === question.correctAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          )}
                        {gameState === 'feedback' &&
                          index === selectedAnswer &&
                          index !== question.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {gameState === 'feedback' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="dark-panel rounded-xl p-6 border-l-4 border-l-cyan-500">
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    {selectedAnswer === question.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" />
                        Not quite — here is why
                      </>
                    )}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {question.explanation}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <CitationCard source={question.source} date="Verified" />
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-medium rounded-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                      {currentQuestionIndex < total - 1 ? 'Next Question' : 'View Results'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="dark-panel rounded-2xl p-8 md:p-12 text-center">
              <div
                className={`w-28 h-28 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-6 border-4 ${tier.ring} shadow-lg`}>
                <span className={`text-3xl font-bold ${tier.color}`}>
                  {animatedScore}%
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className={`w-5 h-5 ${tier.color}`} />
                <h2 className="text-2xl font-bold text-white">{tier.title}</h2>
              </div>
              <p className="text-slate-400 mb-2">
                You scored {score} out of {total} correct.
              </p>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
                {tier.message}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
                <Link
                  to="/articles"
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-white/[0.06] transition-all group">
                  <BookOpen className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                    Read guides
                  </div>
                  <p className="text-xs text-slate-500 mt-1">18 verified articles</p>
                </Link>
                <Link
                  to="/athena"
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-white/[0.06] transition-all group">
                  <MessageSquare className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                    Ask Athena
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Verify a message live</p>
                </Link>
                <Link
                  to="/emergency"
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-white/[0.06] transition-all group">
                  <Phone className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                    Emergency help
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Hotlines & contacts</p>
                </Link>
              </div>

              <button
                type="button"
                onClick={handleStart}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/10 text-white font-medium rounded-lg transition-all inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
