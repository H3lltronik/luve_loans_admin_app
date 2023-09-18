interface LoanFormFieldWithUuid extends LoanFormField {
  uuid: string;
}

type ParsedFormData = LoanFormWithFields;

export const parseFormData = (data: Record<string, any>): ParsedFormData => {
  const parsedData: ParsedFormData = {
    name: data.name,
    isDraft: data.isDraft,
    isPublished: data.isPublished,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
    id: data.id,
    seqId: data.seqId,
    loanFormFields: [],
  };

  const tempFields: Record<string, Partial<LoanFormFieldWithUuid>> = {};

  for (const [key, value] of Object.entries(data)) {
    const [fieldType, uuid] = key.split("_");

    if (uuid) {
      if (!tempFields[uuid]) {
        tempFields[uuid] = { uuid };
      }

      tempFields[uuid][fieldType as keyof LoanFormFieldWithUuid] = value;
    }
  }

  parsedData.loanFormFields = Object.values(tempFields).map(
    (field) => field as LoanFormFieldWithUuid
  );

  return parsedData;
};

export const flattenLoanFormFields = (
  data: LoanFormWithFields
): FlattenedLoanForm => {
  const flattenedData: FlattenedLoanForm = {
    ...data,
  };

  data.loanFormFields.forEach((field) => {
    const uuid = field.id;
    flattenedData[`loanFieldId_${uuid}`] = field.loanFieldId;
    flattenedData[`columnWidth_${uuid}`] = field.columnWidth;
    flattenedData[`priority_${uuid}`] = field.priority;
  });

  return flattenedData;
};
