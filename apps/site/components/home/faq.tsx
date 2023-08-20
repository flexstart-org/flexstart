"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const faqs = [
  {
    question: "What happens when I reach the pod limit on my plan?",
    answer: `If you reach your monthly pod limits, your existing pods will still work, but you need to upgrade to the Pro plan to add more pods.`,
  },
  {
    question: "Can I use the free plan for commercial purposes?",
    answer: `Yes, absolutely! We want to make sure that everyone can use our service for free, whether it's for personal or commercial use. However, we do have a free usage policy in place to prevent abuse. If you exceed the free usage, you may have to upgrade to the Pro plan.`,
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: `Yes, you can cancel your subscription at any time. If you cancel your subscription, you will still be able to use Flexstart until the end of your billing period. After that, you will be downgraded to the free plan.`,
  },
  {
    question: "Do you offer refunds?",
    answer: `We currently do not offer refunds. However, you can cancel your subscription at any time, after which you won't be charged again. We are constantly working on improving our service, so this might change in the future.`,
  },
];

export default function FAQ() {
  return (
    <div className="mt-20 border-t border-gray-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
      <MaxWidthWrapper className="my-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="p-3">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl sm:tracking-wide md:text-4xl">
              Pricing FAQs
            </h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="col-span-2 px-3 sm:px-0"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={idx.toString()}>
                <AccordionTrigger className="py-2">
                  <h3 className="text-left text-lg">{faq.question}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-4">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
