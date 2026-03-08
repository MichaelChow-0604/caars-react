import type { PreviousEncounter } from './types';

export const MOCK_PREVIOUS_ENCOUNTERS: PreviousEncounter[] = [
  {
    id: '1',
    date: '10/08/2010',
    sections: [
      {
        label: 'History',
        content:
          'Itching and white cottage cheese vaginal discharge for past 1 week. Has tried otc creams, would like pessary.',
      },
      { label: 'Examination', content: '' },
      { label: 'Diagnosis', content: 'Thrush' },
      {
        label: 'Plan',
        content: 'Medications as prescribed. Advised can buy otc in future',
      },
    ],
  },
  {
    id: '2',
    date: '06/02/2017',
    sections: [
      {
        label: 'History',
        content:
          "Would like to discuss weight. Found since she started work at desk job and moved closer to the office her weight has increased. Also has new Manager who is not kind and makes her feel stressed. Wonders if there is a physical cause, has read on nhs website and thinks she has all the symptoms of hypothyroidism. However no sensitivtiy to cold, no hair thinning, no abnormal fatigue, no skin thinning, no mood changes. Does feel more self conscious which effects her mood. Eats three meals a day, tries not to snack but does like chocolate. Less active than when she was in her twenties. Non smoker.",
      },
      {
        label: 'Examination',
        content:
          'Looks clinically well but overweight\nBMI 33\nBP 150/90\nChest clear, HS 1+2+0\nAbdomen SNT',
      },
      {
        label: 'Diagnosis',
        content: 'Life style related weight gain, likely causing raised BP',
      },
      { label: 'Plan', content: 'Routine bloods. Home ABPM' },
      { label: 'Lifestyle referral', content: 'Review with results' },
    ],
  },
  {
    id: '3',
    date: '15/09/2019',
    sections: [
      {
        label: 'History',
        content:
          'Persistent dry cough for 3 weeks. No fever, no weight loss. Non-smoker. Works in office environment.',
      },
      {
        label: 'Examination',
        content: 'Chest clear bilaterally. No lymphadenopathy. Throat mildly erythematous.',
      },
      { label: 'Diagnosis', content: 'Post-viral cough' },
      { label: 'Plan', content: 'Simple linctus. Review if no improvement in 2 weeks.' },
    ],
  },
  {
    id: '4',
    date: '22/03/2021',
    sections: [
      {
        label: 'History',
        content:
          'Follow-up for asthma. Generally well controlled. Uses inhaler 1-2 times per week. No recent exacerbations.',
      },
      { label: 'Examination', content: 'Chest clear. Good air entry. No wheeze.' },
      { label: 'Diagnosis', content: 'Asthma, well controlled' },
      { label: 'Plan', content: 'Continue current medication. Annual review in 12 months.' },
    ],
  },
  {
    id: '5',
    date: '08/11/2022',
    sections: [
      {
        label: 'History',
        content:
          'Routine diabetes review. HbA1c improved from last check. Compliant with diet and medication.',
      },
      {
        label: 'Examination',
        content: 'Weight stable. Foot check normal. BP 128/82.',
      },
      { label: 'Diagnosis', content: 'Type 2 diabetes, improving control' },
      { label: 'Plan', content: 'Continue metformin. Repeat HbA1c in 6 months.' },
    ],
  },
  {
    id: '6',
    date: '14/05/2023',
    sections: [
      {
        label: 'History',
        content:
          'Ankle pain after twisting injury 2 days ago. Swelling and bruising. Able to weight bear with discomfort.',
      },
      {
        label: 'Examination',
        content: 'Moderate swelling over lateral malleolus. No bony tenderness. Ottawa rules negative.',
      },
      { label: 'Diagnosis', content: 'Ankle sprain' },
      { label: 'Plan', content: 'RICE. Simple analgesia. Physio referral if no improvement in 2 weeks.' },
    ],
  },
  {
    id: '7',
    date: '20/01/2024',
    sections: [
      {
        label: 'History',
        content:
          'Anxiety and low mood. Stress at work. Sleeping poorly. No suicidal ideation.',
      },
      { label: 'Examination', content: 'Appears anxious but engaged. No red flags.' },
      { label: 'Diagnosis', content: 'Adjustment disorder with anxious mood' },
      { label: 'Plan', content: 'CBT referral. Consider sertraline if no improvement. Safety net.' },
    ],
  },
];
