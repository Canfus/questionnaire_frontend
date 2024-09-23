import { useMemo, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookie } from 'react-use';
import { Helmet } from 'react-helmet';

import {
  Button,
  SelectField,
  RadioGroupField,
  formatDistrictListToSelect,
  formatAnswerListToSelect,
  useNotification,
  type SubmitSuccessHandler,
  type SubmitErrorHandler,
  TextField,
} from '@app/common';
import {
  useGetDistrictListQuery,
  useGetTechQuestionListQuery,
  usePostTechQuizMutation,
} from '@app/api';
import { routenames } from '@app/router';

import type { Schema } from './tech.interface';
import { schema } from './tech.schema';
import { defaultValues } from './tech.constants';
import styles from './tech.module.css';

export const TechPage = () => {
  const { callNotification } = useNotification();
  const navigate = useNavigate();
  const [cookie, updateCookie] = useCookie('tech_quiz_status');

  const { control, handleSubmit, watch, setValue, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const selectedDistrict = watch('district');

  const { data } = useGetDistrictListQuery();
  const { data: questionList } = useGetTechQuestionListQuery();

  useLayoutEffect(() => {
    if (cookie) {
      callNotification({
        type: 'info',
        title: 'Внимание',
        content: 'Вы уже проходили транспортный опрос',
      });

      navigate(routenames.HOME);
    }
  }, [callNotification, cookie, navigate]);

  useEffect(() => {
    if (questionList) {
      reset({
        district: selectedDistrict || '',
        answers: questionList.questions.map((question) => ({
          answer: '',
          question: question.question,
          required: question.required,
        })),
      });
    }
  }, [selectedDistrict, questionList, reset]);

  const districtList = useMemo(() => formatDistrictListToSelect(data), [data]);

  const { mutate, isPending } = usePostTechQuizMutation({
    onSuccess: () => {
      callNotification({
        type: 'success',
        content: 'Спасибо за отзыв!',
        timerAutoClose: 5000,
      });

      updateCookie('success');

      navigate(routenames.HOME);
    },
  });

  const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
    console.log(values);
    mutate(values);
  };

  const onFormSubmitError: SubmitErrorHandler<Schema> = () => {
    callNotification({
      type: 'error',
      content: 'Заполните форму',
      timerAutoClose: 3000,
    });
  };

  return (
    <div className={styles.page}>
      <Helmet>
        <title>Камская агломерация | Транспортный опрос</title>
        <meta
          name="description"
          content="Опрос, составленный с целью изучить значимые культурные, бытовые, транспортные и экономические связи на территории Камской агломерации."
        />

        <meta name="og:type" content="website" />
        <meta
          name="og:title"
          content="Камская агломерация | Транспортный опрос"
        />
        <meta
          name="og:description"
          content="Камская агломерация | Транспортный опрос"
        />
        <meta
          name="og:description"
          content="Опрос, составленный с целью изучить значимые культурные, бытовые, транспортные и экономические связи на территории Камской агломерации."
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Камская агломерация | Транспортный опрос"
        />
        <meta
          name="twitter:description"
          content="Опрос, составленный с целью изучить значимые культурные, бытовые, транспортные и экономические связи на территории Камской агломерации."
        />
      </Helmet>
      <form
        onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}
        className={styles.form}
      >
        <h2 className={styles.form__title}>
          Где вы проживаете?<span className={styles.title__required}>*</span>
        </h2>
        <SelectField
          control={control}
          name="district"
          placeholder="Выберите район"
          options={districtList}
        />
        <div className={styles.question__list}>
          {questionList &&
            questionList.questions.map((question, index) =>
              question.personal_answer_checker ? (
                <div key={question.id} className={styles.form__field}>
                  <p className={styles.field__title}>
                    <span>{index + 1}. </span>
                    {question.question}
                    {question.required && (
                      <span className={styles.title__required}>*</span>
                    )}
                  </p>
                  <TextField
                    control={control}
                    name={`answers.${index}.answer`}
                    placeholder="Ваш ответ"
                    customError="Введите Ваш ответ"
                    extraOnChange={() => {
                      setValue(`answers.${index}.question`, question.question);
                    }}
                  />
                </div>
              ) : (
                <RadioGroupField
                  key={question.id}
                  options={formatAnswerListToSelect(question)}
                  control={control}
                  name={`answers.${index}.answer`}
                  title={question.question}
                  index={index + 1}
                  required={question.required}
                  returnValue={(option) => option.value}
                  onValueChange={() => {
                    setValue(`answers.${index}.question`, question.question);
                  }}
                />
              ),
            )}
        </div>
        {questionList && (
          <Button
            type="submit"
            variant="secondary"
            className={styles.form__submit}
            disabled={isPending}
          >
            Отправить форму
          </Button>
        )}
      </form>
    </div>
  );
};
