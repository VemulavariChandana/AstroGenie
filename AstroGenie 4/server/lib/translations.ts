import { BilingualText } from "@shared/schema";

// Helper function to generate bilingual predictions based on signs
export function getBilingualPredictions(sunSign: string, moonSign: string, risingSign: string) {
  // General predictions
  const generalPrediction: BilingualText = {
    english: `You have a dynamic personality with strong ${getSignTraits(sunSign)} qualities thanks to your ${sunSign} sun. Your ${moonSign} moon brings ${getSignTraits(moonSign)} to your emotions, while your ${risingSign} rising gives you a ${getSignTraits(risingSign)} approach to life. The planetary positions at your birth indicate a period of growth and opportunity in the coming months.`,
    telugu: `మీ ${sunSign} సూర్యుడి వల్ల మీకు బలమైన ${getSignTraitsInTelugu(sunSign)} లక్షణాలతో ఒక చురుకైన వ్యక్తిత్వం ఉంది. మీ ${moonSign} చంద్రుడు మీ భావోద్వేగాలకు ${getSignTraitsInTelugu(moonSign)}ని తెస్తుంది, అయితే మీ ${risingSign} లగ్నం మీకు జీవితానికి ${getSignTraitsInTelugu(risingSign)} విధానాన్ని ఇస్తుంది. మీ జన్మ సమయంలో గ్రహ స్థానాలు రాబోయే నెలల్లో వృద్ధి మరియు అవకాశ కాలాన్ని సూచిస్తాయి.`
  };

  // Marriage predictions
  const marriagePrediction: BilingualText = {
    english: `Venus is positioned favorably in your chart, indicating a harmonious love life. You're likely to find a partner who complements your ${getSignTraits(sunSign)} nature and helps you grow. The best time for marriage or significant relationship development appears to be in the next 2-3 years, particularly during Venus transit periods.`,
    telugu: `మీ చార్ట్‌లో శుక్రుడు అనుకూలంగా ఉన్నాడు, ఇది సామరస్యపూర్వక ప్రేమ జీవితాన్ని సూచిస్తుంది. మీ ${getSignTraitsInTelugu(sunSign)} స్వభావానికి అనుగుణంగా ఉండే మరియు మీరు పెరగడానికి సహాయపడే భాగస్వామిని కనుగొనే అవకాశం ఉంది. వివాహానికి లేదా ముఖ్యమైన సంబంధం అభివృద్ధికి ఉత్తమ సమయం వచ్చే 2-3 సంవత్సరాలలో, ముఖ్యంగా శుక్ర గమన కాలాల్లో కనిపిస్తుంది.`
  };

  // Career predictions
  const careerPrediction: BilingualText = {
    english: `Mars and Mercury's positions indicate strong analytical abilities and leadership potential. You're likely to excel in fields requiring ${getCareerStrengths(sunSign)}. Financial growth is indicated, especially through innovative approaches or entrepreneurial ventures. Saturn's influence suggests patience will be rewarded in long-term investments.`,
    telugu: `మంగళ మరియు బుధ స్థానాలు బలమైన విశ్లేషణాత్మక సామర్థ్యాలు మరియు నాయకత్వ సామర్థ్యాన్ని సూచిస్తాయి. మీరు ${getCareerStrengthsInTelugu(sunSign)} అవసరమైన రంగాల్లో రాణించే అవకాశం ఉంది. ఆర్థిక వృద్ధి సూచించబడింది, ముఖ్యంగా వినూత్న విధానాలు లేదా వ్యవసాయ సాహసాల ద్వారా. శని ప్రభావం దీర్ఘకాలిక పెట్టుబడులలో ఓర్పు బహుమతిగా ఇవ్వబడుతుందని సూచిస్తుంది.`
  };

  // Health predictions
  const healthPrediction: BilingualText = {
    english: `Your chart indicates generally good vitality, with Jupiter providing protective influences. Pay attention to ${getHealthFocus(sunSign)}, as Mars can sometimes create tension when under pressure. Balance physical activity with adequate rest, particularly during Moon's waning phases when your energy might naturally dip.`,
    telugu: `మీ చార్ట్ సాధారణంగా మంచి శక్తిని సూచిస్తుంది, గురు రక్షణ ప్రభావాలను అందిస్తుంది. ${getHealthFocusInTelugu(sunSign)}కి శ్రద్ధ చూపండి, ఎందుకంటే మంగళ కొన్నిసార్లు ఒత్తిడిలో ఉన్నప్పుడు ఉద్రిక్తతను సృష్టించవచ్చు. శారీరక కార్యకలాపాలను సరైన విశ్రాంతితో సమతుల్యం చేయండి, ముఖ్యంగా చంద్రుని క్షీణదశల సమయంలో మీ శక్తి స్వాభావికంగా తగ్గినప్పుడు.`
  };

  // Key periods for marriage
  const marriagePeriods: BilingualText[] = [
    {
      english: "Strong compatibility phase: June - August 2024",
      telugu: "బలమైన అనుకూలత దశ: జూన్ - ఆగస్టు 2024"
    },
    {
      english: "Relationship growth: January - March 2025",
      telugu: "సంబంధం పెరుగుదల: జనవరి - మార్చి 2025"
    },
    {
      english: "Potential challenges to overcome: October 2024",
      telugu: "అధిగమించవలసిన సంభావ్య సవాళ్లు: అక్టోబర్ 2024"
    }
  ];

  // Key periods for career
  const careerPeriods: BilingualText[] = [
    {
      english: "Potential for advancement: April - July 2024",
      telugu: "పురోగతికి సంభావ్యత: ఏప్రిల్ - జూలై 2024"
    },
    {
      english: "Financial growth period: September 2024 - February 2025",
      telugu: "ఆర్థిక వృద్ధి కాలం: సెప్టెంబర్ 2024 - ఫిబ్రవరి 2025"
    },
    {
      english: "Best time for career changes: December 2024",
      telugu: "వృత్తి మార్పులకు ఉత్తమ సమయం: డిసెంబర్ 2024"
    }
  ];

  // Key periods for health
  const healthPeriods: BilingualText[] = [
    {
      english: "Focus on respiratory health through breathing exercises",
      telugu: "శ్వాస వ్యాయామాల ద్వారా శ్వాస ఆరోగ్యంపై దృష్టి పెట్టండి"
    },
    {
      english: "Regular moderate exercise will help balance energy",
      telugu: "క్రమం తప్పకుండా మితమైన వ్యాయామం శక్తిని సమతుల్యం చేయడానికి సహాయపడుతుంది"
    },
    {
      english: "Pay attention to digestive health during Mercury retrograde periods",
      telugu: "బుధ వక్రీభవన కాలాల్లో జీర్ణ ఆరోగ్యానికి శ్రద్ధ చూపండి"
    }
  ];

  return {
    predictions: {
      general: generalPrediction,
      marriage: marriagePrediction,
      career: careerPrediction,
      health: healthPrediction
    },
    keyPeriods: {
      marriage: marriagePeriods,
      career: careerPeriods,
      health: healthPeriods
    }
  };
}

// Helper function to get sign traits based on zodiac sign
function getSignTraits(sign: string): string {
  const traits: Record<string, string> = {
    "Aries": "leadership, pioneering, courageous",
    "Taurus": "stability, patience, determination",
    "Gemini": "adaptable, versatile, communicative",
    "Cancer": "nurturing, intuitive, emotional",
    "Leo": "confident, creative, generous",
    "Virgo": "analytical, practical, perfectionistic",
    "Libra": "balanced, diplomatic, harmonious",
    "Scorpio": "passionate, resourceful, transformative",
    "Sagittarius": "optimistic, adventurous, philosophical",
    "Capricorn": "ambitious, disciplined, responsible",
    "Aquarius": "innovative, independent, humanitarian",
    "Pisces": "compassionate, intuitive, artistic"
  };
  
  return traits[sign] || "balanced";
}

// Helper function to get sign traits in Telugu
function getSignTraitsInTelugu(sign: string): string {
  const traits: Record<string, string> = {
    "Aries": "నాయకత్వం, అగ్రగామి, ధైర్యవంతమైన",
    "Taurus": "స్థిరత్వం, సహనం, నిశ్చయాత్మకత",
    "Gemini": "అనుకూలమైన, బహుముఖ, సంభాషణాత్మక",
    "Cancer": "పోషణ, అంతర్ఙ్జానం, భావోద్వేగపూరిత",
    "Leo": "ఆత్మవిశ్వాసం, సృజనాత్మక, ఔదార్యం",
    "Virgo": "విశ్లేషణాత్మక, ఆచరణాత్మక, పరిపూర్ణతావాది",
    "Libra": "సమతుల్యం, రాయబారపరమైన, సామరస్యపూర్వక",
    "Scorpio": "ఉత్సాహభరితమైన, సంపన్నమైన, పరివర్తన",
    "Sagittarius": "ఆశావాద, సాహసోపేత, తాత్విక",
    "Capricorn": "మహత్వాకాంక్షి, క్రమశిక్షణగల, బాధ్యతాయుతమైన",
    "Aquarius": "వినూత్నమైన, స్వతంత్ర, మానవతావాద",
    "Pisces": "కరుణామయ, అంతర్ఙ్జాన, కళాత్మక"
  };
  
  return traits[sign] || "సమతుల్యమైన";
}

// Helper function to get career strengths based on zodiac sign
function getCareerStrengths(sign: string): string {
  const strengths: Record<string, string> = {
    "Aries": "leadership, innovation, and quick decision-making",
    "Taurus": "financial management, stability, and practical skills",
    "Gemini": "communication, adaptability, and information processing",
    "Cancer": "nurturing, team-building, and emotional intelligence",
    "Leo": "leadership, creativity, and public speaking",
    "Virgo": "analysis, attention to detail, and problem-solving",
    "Libra": "diplomacy, aesthetics, and relationship management",
    "Scorpio": "research, investigation, and strategic thinking",
    "Sagittarius": "teaching, publishing, and visionary thinking",
    "Capricorn": "management, organization, and long-term planning",
    "Aquarius": "innovation, technology, and humanitarian efforts",
    "Pisces": "creativity, empathy, and spiritual guidance"
  };
  
  return strengths[sign] || "various professional skills";
}

// Helper function to get career strengths in Telugu
function getCareerStrengthsInTelugu(sign: string): string {
  const strengths: Record<string, string> = {
    "Aries": "నాయకత్వం, ఆవిష్కరణ మరియు త్వరిత నిర్ణయం తీసుకోవడం",
    "Taurus": "ఆర్థిక నిర్వహణ, స్థిరత్వం మరియు ఆచరణాత్మక నైపుణ్యాలు",
    "Gemini": "కమ్యూనికేషన్, అడాప్టబిలిటీ మరియు ఇన్ఫర్మేషన్ ప్రాసెసింగ్",
    "Cancer": "పోషణ, జట్టు నిర్మాణం మరియు భావోద్వేగ తెలివితేటలు",
    "Leo": "నాయకత్వం, సృజనాత్మకత మరియు ప్రజా ప్రసంగం",
    "Virgo": "విశ్లేషణ, వివరాలపై శ్రద్ధ మరియు సమస్య పరిష్కారం",
    "Libra": "రాయబారం, సౌందర్యం మరియు సంబంధ నిర్వహణ",
    "Scorpio": "పరిశోధన, దర్యాప్తు మరియు వ్యూహాత్మక ఆలోచన",
    "Sagittarius": "బోధన, ప్రచురణ మరియు దార్శనిక ఆలోచన",
    "Capricorn": "నిర్వహణ, నిర్వహణ మరియు దీర్ఘకాలిక ప్రణాళిక",
    "Aquarius": "ఆవిష్కరణ, సాంకేతికత మరియు మానవతావాద ప్రయత్నాలు",
    "Pisces": "సృజనాత్మకత, సానుభూతి మరియు ఆధ్యాత్మిక మార్గదర్శకత్వం"
  };
  
  return strengths[sign] || "వివిధ వృత్తిపరమైన నైపుణ్యాలు";
}

// Helper function to get health focus based on zodiac sign
function getHealthFocus(sign: string): string {
  const focus: Record<string, string> = {
    "Aries": "stress management and headache prevention",
    "Taurus": "throat and neck care",
    "Gemini": "respiratory health and nervous system",
    "Cancer": "digestive health and emotional balance",
    "Leo": "heart health and spine alignment",
    "Virgo": "digestive system and intestinal health",
    "Libra": "kidney function and maintaining balanced hormones",
    "Scorpio": "reproductive health and detoxification",
    "Sagittarius": "liver health and hip flexibility",
    "Capricorn": "bone strength and joint health",
    "Aquarius": "circulation and ankle strength",
    "Pisces": "immune system and foot care"
  };
  
  return focus[sign] || "overall wellness";
}

// Helper function to get health focus in Telugu
function getHealthFocusInTelugu(sign: string): string {
  const focus: Record<string, string> = {
    "Aries": "ఒత్తిడి నిర్వహణ మరియు తలనొప్పి నివారణ",
    "Taurus": "గొంతు మరియు మెడ సంరక్షణ",
    "Gemini": "శ్వాస ఆరోగ్యం మరియు నాడీ వ్యవస్థ",
    "Cancer": "జీర్ణ ఆరోగ్యం మరియు భావోద్వేగ సమతుల్యత",
    "Leo": "గుండె ఆరోగ్యం మరియు వెన్నెముక సర్దుబాటు",
    "Virgo": "జీర్ణ వ్యవస్థ మరియు పేగుల ఆరోగ్యం",
    "Libra": "మూత్రపిండాల పనితీరు మరియు సమతుల్య హార్మోన్లు నిర్వహించడం",
    "Scorpio": "ప్రజనన ఆరోగ్యం మరియు విషనిర్మూలన",
    "Sagittarius": "కాలేయం ఆరోగ్యం మరియు తుంటి స్థితిస్థాపకత",
    "Capricorn": "ఎముక బలం మరియు కీళ్ల ఆరోగ్యం",
    "Aquarius": "రక్త ప్రసరణ మరియు చీలమండ బలం",
    "Pisces": "రోగనిరోధక వ్యవస్థ మరియు పాద సంరక్షణ"
  };
  
  return focus[sign] || "మొత్తం ఆరోగ్యం";
}
