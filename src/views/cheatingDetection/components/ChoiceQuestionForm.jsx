import { Button, Divider, Form, Radio, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const ChoiceQuestionForm = (props) => {
  const { question, answer, handleAnswerSubmit } = props

  const [form] = Form.useForm()

  const [submitted, setSubmitted] = useState(answer?.submitted || false)

  useEffect(() => {
    setSubmitted(answer?.submitted || false)
  }, [answer])

  useEffect(() => {
    form.setFieldsValue({
      ans: answer?.studentAnswer
    })
  }, [])

  const handleFormSubmit = (values) => {
    handleAnswerSubmit(question.id, values.ans)
  }

  const handleSubmittedState = () => {
    setSubmitted(false)
  }

  return (
    <>
      <div
        style={{
          minWidth: '400px',
          backgroundColor: '#eee',
          borderRadius: '5px',
          padding: '20px 20px',
          width: '100%',
          marginTop: '20px'
        }}
      >
        <Form form={form} onFinish={handleFormSubmit} name="question">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Space>
              <Title style={{ margin: '0' }} level={5}>
                Question No: {question.question_number}
              </Title>
            </Space>
            <Space align="start">
              <Text strong>Points: {question.points}</Text>
            </Space>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Title level={4}>{question.question_text}</Title>
          </div>

          <Form.Item name="ans">
            <Radio.Group
              onChange={handleSubmittedState}
              style={{ marginTop: '24px' }}
            >
              <Space direction="vertical" size="large">
                {question.choices?.map((choice, index) => (
                  <Radio key={index} value={choice}>
                    {choice}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>

          <Divider style={{ border: '1px solid #ccc', margin: '20px 0px' }} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Space>
              <Button
                disabled={submitted}
                icon={
                  submitted ? (
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
                onClick={() => form.submit()}
              >
                Save
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ChoiceQuestionForm
