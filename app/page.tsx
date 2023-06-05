"use client"
import { useState } from 'react';
import Image from 'next/image'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isValid } from 'date-fns'

export default function Home() {
  const [date, setDate] = useState('- -');
  const [month, setMonth] = useState('- -');
  const [year, setYear] = useState('- -');


  const schema = z.object({
    date: z
      .string()
      .min(1, { message: "This field is required" })
      .superRefine((val, ctx) => {
        const day = parseInt(val);
        if (!(day >= 1 && day <= 31)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Must be a valid day`,
          });
        }
      }),

    month: z
      .string()
      .min(1, { message: "This field is required" })
      .superRefine((val, ctx) => {
        const month = parseInt(val);
        if (!(month >= 1 && month <= 12)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Must be a valid month`,
          });
        }
      }),

    year: z
      .string()
      .min(1, { message: "This field is required" })
      .max(4, { message: "Must be a valid year" })
      .superRefine((val, ctx) => {
        const currentYear = new Date().getFullYear();
        const year = parseInt(val);
        if (year > currentYear) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Must be in the past`,
          });
        }
      }),
  }).refine((data) => {
    const month = parseInt(data.month);
    const year = parseInt(data.year);
    const date = new Date(year, month - 1, parseInt(data.date));

    return isValid(date) && date.getDate() === parseInt(data.date);
  }, {
    message: "Must be a valid date",
    path: ["date"],
  });

  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {

    let today = new Date();
    let birthDate = new Date(`${data.year}-${data.month}-${data.date}`);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      let prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
      ageDays = Math.floor((today.getTime() - prevMonthDate.getTime()) / (1000 * 60 * 60 * 24));
      ageMonths--;
    }

    setDate(ageDays.toString());
    setMonth(ageMonths.toString());
    setYear(ageYears.toString());
  }

  return (
    <div className='max-w-[343px] sm:max-w-[840px] sm:space-y-0 space-y-8 p-8 sm:p-14 bg-white rounded-3xl rounded-ee-[100px] sm:rounded-ee-[200px]'>
      <form onSubmit={handleSubmit(onSubmit)}  >
        <div className='flex gap-4 sm:gap-8 sm:w-9/12'>
          <div className='flex flex-col gap-1'>
            <label className={`block font-bold ${errors.date ? 'text-primary-light-red' : 'text-neutral-smokey-grey'}`} htmlFor="date">DAY</label>
            <input className={`caret-primary-purple font-bold px-4 py-3 bg-transparent border rounded-lg outline-primary-purple sm:text-[32px] w-full ${errors.date ? 'border-primary-light-red' : ''}`}
              id='date'
              type="number" {...register("date")}
              placeholder='DD'
              autoComplete='off'
            />
            {errors.date && <span className='italic text-primary-light-red'>{errors.date.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label className={`block font-bold ${errors.month ? 'text-primary-light-red' : 'text-neutral-smokey-grey'}`} htmlFor="dat">MONTH</label>
            <input className={`caret-primary-purple font-bold px-4 py-3 bg-transparent border rounded-lg outline-primary-purple sm:text-[32px] w-full ${errors.month ? 'border-primary-light-red' : ''}`}
              id='month'
              type="number" {...register("month")}
              placeholder='MM'
              autoComplete='off'
            />
            {errors.month && <span className='italic text-primary-light-red'>{errors.month.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label className={`block font-bold ${errors.year ? 'text-primary-light-red' : 'text-neutral-smokey-grey'}`} htmlFor="da">YEAR</label>
            <input className={`caret-primary-purple font-bold px-4 py-3 bg-transparent border rounded-lg outline-primary-purple sm:text-[32px] w-full ${errors.year ? 'border-primary-light-red' : ''}`}
              id='year'
              type="number" {...register("year")}
              placeholder='YYYY'
              autoComplete='off' />
            {errors.year && <span className='italic text-primary-light-red'>{errors.year.message}</span>}
          </div>
        </div>

        <div className='relative flex items-center justify-center h-16 my-8 sm:my-0 sm:h-24'>
          <div className='relative w-full border border-neutral-light-grey-grey'></div>
          <button className='absolute flex items-center justify-center w-16 h-16 rounded-full sm:w-24 sm:h-24 sm:right-0 bg-primary-purple hover:bg-neutral-off-black' aria-label="Calculate"
            type='submit'
          >
            <Image
              className='w-6 h-6 sm:w-11 sm:h-11'
              src="/images/icon-arrow.svg"
              alt=""
              width={0}
              height={0}
            />
          </button>
        </div>

      </form>

      <div className='italic font-extrabold text-[48px] sm:text-[104px]'>
        <ul className='leading-[1em]'>
          <li><span className='text-primary-purple'>{year}</span> years</li>
          <li><span className='text-primary-purple'>{month}</span> months</li>
          <li><span className='text-primary-purple'>{date}</span> days</li>
        </ul>
      </div>

    </div>
  )
}
