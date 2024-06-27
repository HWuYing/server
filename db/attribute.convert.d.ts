export declare class AttributeConverter<T, M> {
    convertToDatabaseColumn(value: M): T;
    convertToEntityAttribute(value: T): M;
}
