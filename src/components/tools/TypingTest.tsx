import { useState, useEffect, useRef } from 'react';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { portugueseWords } from '@/utils/words';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const WORDS_TO_DISPLAY = 200;
const TEST_DURATION_SECONDS = 60;

type WordStatus = 'correct' | 'incorrect' | 'untyped';

export const TypingTest = () => {
  const [words, setWords] = useState<string[]>([]);
  const [typedWordsStatus, setTypedWordsStatus] = useState<WordStatus[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION_SECONDS);
  const [isTestRunning, setIsTestRunning] = useState(false);
  
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateWords = () => {
    const shuffled = [...portugueseWords].sort(() => 0.5 - Math.random());
    setWords(shuffled.slice(0, WORDS_TO_DISPLAY));
    setTypedWordsStatus(Array(WORDS_TO_DISPLAY).fill('untyped'));
  };

  useEffect(() => {
    generateWords();
  }, []);

  useEffect(() => {
    if (isTestRunning && timeRemaining > 0) {
      timerRef.current = setTimeout(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (timeRemaining === 0 && isTestRunning) {
      endTest();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTestRunning, timeRemaining]);

  useEffect(() => {
    wordRefs.current[currentWordIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentWordIndex]);

  const startTest = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    generateWords();
    setIsTestRunning(true);
    setShowResults(false);
    setCurrentWordIndex(0);
    setInputValue('');
    setTimeRemaining(TEST_DURATION_SECONDS);
    setCorrectWordsCount(0);
    setIncorrectWordsCount(0);
    setCharCount(0);
    inputRef.current?.focus();
  };

  const endTest = () => {
    setIsTestRunning(false);
    setShowResults(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestRunning && !showResults) {
      setIsTestRunning(true);
    }

    const value = e.target.value;
    if (value.endsWith(' ')) {
      const currentWord = words[currentWordIndex];
      const typedWord = value.trim();
      
      const newStatus = [...typedWordsStatus];
      if (typedWord === currentWord) {
        setCorrectWordsCount(prev => prev + 1);
        setCharCount(prev => prev + typedWord.length + 1);
        newStatus[currentWordIndex] = 'correct';
      } else {
        setIncorrectWordsCount(prev => prev + 1);
        newStatus[currentWordIndex] = 'incorrect';
      }
      
      setTypedWordsStatus(newStatus);
      setCurrentWordIndex(prev => prev + 1);
      setInputValue('');
    } else {
      setInputValue(value);
    }
  };

  const calculateWPM = () => Math.round((charCount / 5) / (TEST_DURATION_SECONDS / 60));
  const calculateAccuracy = () => {
    const totalWords = correctWordsCount + incorrectWordsCount;
    return totalWords === 0 ? 0 : (correctWordsCount / totalWords) * 100;
  };

  const getPerformanceFeedback = () => {
    const wpm = calculateWPM();
    if (wpm < 20) return { message: "Continue praticando!", emoji: "🐢" };
    if (wpm < 40) return { message: "Você está no caminho certo!", emoji: "👍" };
    if (wpm < 60) return { message: "Velocidade impressionante!", emoji: "🚀" };
    if (wpm < 80) return { message: "Você é um mestre da digitação!", emoji: "🏆" };
    return { message: "Velocidade de um raio!", emoji: "⚡️" };
  };

  return (
    <ToolLayout
      title="Teste de Digitação"
      description="Teste sua velocidade e precisão de digitação em português. O teste dura 60 segundos."
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-mono bg-background p-4 rounded-md h-32 overflow-y-auto relative" onClick={() => inputRef.current?.focus()}>
              {words.map((word, index) => (
                <span
                  key={index}
                  ref={el => wordRefs.current[index] = el}
                  className={cn('transition-colors', {
                    'bg-muted rounded-md px-1': index === currentWordIndex,
                    'text-green-500': typedWordsStatus[index] === 'correct',
                    'text-red-500 line-through': typedWordsStatus[index] === 'incorrect',
                  })}
                >
                  {word}{' '}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder={!isTestRunning && !showResults ? "Comece a digitar para iniciar..." : ""}
            className="flex-1 font-mono"
            value={inputValue}
            onChange={handleInputChange}
            disabled={showResults}
          />
          <div className="text-xl font-bold w-24 text-center">
            {timeRemaining}s
          </div>
          <Button onClick={startTest}>Reiniciar</Button>
        </div>

        {showResults && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{getPerformanceFeedback().emoji} {getPerformanceFeedback().message} {getPerformanceFeedback().emoji}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">WPM</p>
                <p className="text-3xl font-bold">{calculateWPM()}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Precisão</p>
                <p className="text-3xl font-bold">{calculateAccuracy().toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Corretas</p>
                <p className="text-3xl font-bold">{correctWordsCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Incorretas</p>
                <p className="text-3xl font-bold">{incorrectWordsCount}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};
