import {ButtonHTMLAttributes, FormEventHandler, PropsWithChildren, useEffect, useState} from "react";
import {useExternalState} from "./useExternalState.ts";
import {LOADIPHLPAPI} from "dns";



let counter = 0

const log = (...args: any[]) => {
    counter++
    console.log(...args, `RENDER: ${counter}`)
}

interface ExampleProps {
}

const DEFAULT_DATA: Data = {
    text: ''
}

export const Example = (props: ExampleProps) => {
    const {} = props;

    const [data, setData] = useState<Data>(() => DEFAULT_DATA)

    useEffect(() => {
        setTimeout(() => setData({text: 'hello'}), 3000)
    }, []);

    return (
        <div>
            <SomeFormWithExternal data={data} onSave={setData}/>
            <span>Text: {data.text}</span>
        </div>
    );
};

const SomeForm = (props: SomeFormProps) => {

    const {data: externalData, onSave, isSimple } = props

    const [data, setData] = useState(() => externalData)

    useEffect(() => {
        setData(externalData)
    }, [externalData]);

    const handleChangeText = (text: string) => setData(prev => ({...prev, text}))

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        onSave(data)
    }

    log('PARENT FORM', data)

    const FormComponent = isSimple ? 'form' : Form
    const ButtonComponent = isSimple ? 'button' : Button
    
    
    return <FormComponent onSubmit={handleSubmit}>
        <Input value={data.text} onChange={handleChangeText}/>
        <ButtonComponent type="submit">Save</ButtonComponent>
    </FormComponent>
}

const Form = (props: FormProps) => {
    log('CHILD FORM');

    return <form onSubmit={props.onSubmit}>{props.children}</form>
}

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    log('CHILD BUTTON');

    return <button type={props.type}>{props.children}</button>
}

const Input = (props: InputProps) => {
    const {value, onChange} = props

    log('CHILD INPUT')

    return <div>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
        <Icon/>
    </div>

}

const Icon = () => {
    log('ICON')
    return <svg><circle rx={10} ry={10}/></svg>
}

Example.displayName = 'Example';



const SomeFormWithExternal = (props: SomeFormProps) => {

    const {data: externalData, onSave, isSimple} = props

    const [data, setData] = useExternalState({
        external: externalData,
    })

    const handleChangeText = (text: string) => setData(prev => ({...prev, text}))

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        onSave(data)
    }

    log('PARENT FORM')

    const FormComponent = isSimple ? 'form' : Form
    const ButtonComponent = isSimple ? 'button' : Button

    return <FormComponent onSubmit={handleSubmit}>
        <Input value={data.text} onChange={handleChangeText}/>
        <ButtonComponent type="submit">Save</ButtonComponent>
    </FormComponent>
}

interface Data {
    text: string

}

interface SomeFormProps {
    data: Data
    onSave: (data: Data) => void;
    isSimple?: boolean;
}

interface FormProps extends PropsWithChildren{
    onSubmit: FormEventHandler;
}

interface InputProps {
    value: string
    onChange: (str: string) => void;
}