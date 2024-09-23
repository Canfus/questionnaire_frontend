import { useMemo, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookie } from 'react-use';
import { Helmet } from 'react-helmet';

import {
  SelectField,
  SliderField,
  RadioGroupField,
  Button,
  formatDistrictListToSelect,
  formatAnswerListToSelect,
  useNotification,
  Spinner,
  type SubmitSuccessHandler,
  type SubmitErrorHandler,
  TextField,
} from '@app/common';
import {
  useGetDistrictListQuery,
  useGetEnvQuestionListQuery,
  usePostEnvQuizMutation,
} from '@app/api';
import { routenames } from '@app/router';

import type { Schema } from './env.interface';
import { schema } from './env.schema';
import { defaultValues } from './env.constants';
import styles from './env.module.css';

export const EnvPage = () => {
  const { callNotification } = useNotification();
  const navigate = useNavigate();
  const [cookie, updateCookie] = useCookie('env_quiz_status');

  const { control, handleSubmit, watch, setValue, reset, getValues } =
    useForm<Schema>({
      resolver: zodResolver(schema),
      defaultValues,
    });

  const selectedDistrict = watch('district');

  const { data } = useGetDistrictListQuery();
  const { data: questionList, isFetching } = useGetEnvQuestionListQuery();

  useLayoutEffect(() => {
    if (cookie) {
      callNotification({
        type: 'info',
        title: 'Внимание',
        content: 'Вы уже проходили опрос качества среды',
      });

      navigate(routenames.HOME);
    }
  }, [callNotification, cookie, navigate]);

  useLayoutEffect(() => {
    if (questionList) {
      reset({
        district: selectedDistrict || '',
        blocks: questionList.blocks.map((block) => ({
          answers: block.questions.map((question) => ({
            answer: '',
            question: question.question,
            required: question.required,
          })),
          block_name: block.title,
          rate: block.has_rate ? [0] : undefined,
        })),
      });
    }
  }, [questionList, reset, selectedDistrict]);

  const districtList = useMemo(() => formatDistrictListToSelect(data), [data]);

  const { mutate, isPending } = usePostEnvQuizMutation({
    onSuccess: () => {
      callNotification({
        type: 'success',
        content: 'Спасибо за отзыв!',
      });

      updateCookie('success');

      navigate(routenames.HOME);
    },
  });

  const onFormSubmit: SubmitSuccessHandler<Schema> = (values) => {
    console.log(values);
    mutate(values);
  };

  const onFormSubmitError: SubmitErrorHandler<Schema> = (errors) => {
    console.log(errors);
    console.log(getValues());

    callNotification({
      type: 'error',
      content: 'Заполните форму',
      timerAutoClose: 5000,
    });
  };

  return (
    <div className={styles.page}>
      <Helmet>
        <title>Камская агломерация | Опрос качества среды</title>
        <meta
          name="description"
          content="Опрос для субъективного определения состояния городской среды в Вашем населенном пункте."
        />

        <meta name="og:type" content="website" />
        <meta
          name="og:title"
          content="Камская агломерация | Опрос качества среды"
        />
        <meta
          name="og:description"
          content="Камская агломерация | Опрос качества среды"
        />
        <meta
          name="og:description"
          content="Опрос для субъективного определения состояния городской среды в Вашем населенном пункте."
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Камская агломерация | Опрос качества среды"
        />
        <meta
          name="twitter:description"
          content="Опрос для субъективного определения состояния городской среды в Вашем населенном пункте."
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
          {isFetching && (
            <div
              style={{
                width: '100%',
                padding: '40px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </div>
          )}
          {questionList &&
            questionList.blocks.map((block, blockIndex) => (
              <div key={block.id} className={styles.question__block}>
                {block.has_rate && (
                  <>
                    <div>
                      <h3 className={styles.block__title}>
                        Блок «{block.title}»
                      </h3>
                      <p className={styles.block__description}>
                        {block.description}
                      </p>
                    </div>
                    <SliderField
                      control={control}
                      name={`blocks.${blockIndex}.rate`}
                      title="Оцените блок"
                      defaultValue={[0]}
                    />
                  </>
                )}
                {block.questions.map((question, questionIndex) =>
                  question.personal_answer_checker ? (
                    <div key={question.id} className={styles.form__field}>
                      <p className={styles.field__title}>
                        <span>{questionIndex + 1}. </span>
                        {question.question}
                        {question.required && (
                          <span className={styles.title__required}>*</span>
                        )}
                      </p>
                      <TextField
                        control={control}
                        name={`blocks.${blockIndex}.answers.${questionIndex}.answer`}
                        placeholder="Ваш ответ"
                        customError="Введите Ваш ответ"
                        extraOnChange={() => {
                          setValue(
                            `blocks.${blockIndex}.answers.${questionIndex}.question`,
                            question.question,
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <RadioGroupField
                      key={question.id}
                      options={formatAnswerListToSelect(question)}
                      control={control}
                      name={`blocks.${blockIndex}.answers.${questionIndex}.answer`}
                      title={question.question}
                      index={questionIndex + 1}
                      required={question.required}
                      returnValue={(option) => option.value}
                      onValueChange={() => {
                        setValue(
                          `blocks.${blockIndex}.answers.${questionIndex}.question`,
                          question.question,
                        );
                      }}
                    />
                  ),
                )}
              </div>
            ))}
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
