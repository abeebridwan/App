import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import Modal from '@components/Modal';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';

const propTypes = {
    /** Whether the modal is visible */
    isVisible: PropTypes.bool.isRequired,

    /** Items to pick from */
    items: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string, label: PropTypes.string})),

    /** The selected item */
    selectedItem: PropTypes.shape({value: PropTypes.string, label: PropTypes.string}),

    /** Label for values */
    label: PropTypes.string,

    /** Function to call when the user selects a item */
    onItemSelected: PropTypes.func,

    /** Function to call when the user closes the modal */
    onClose: PropTypes.func,

    /** Whether to show the toolip text */
    shouldShowTooltips: PropTypes.bool,
};

const defaultProps = {
    items: [],
    selectedItem: {},
    label: '',
    onClose: () => {},
    onItemSelected: () => {},
    shouldShowTooltips: true,
};

function ValueSelectorModal({items, selectedItem, label, isVisible, onClose, onItemSelected, shouldShowTooltips}) {
    const styles = useThemeStyles();
    const sections = useMemo(() => {
        const itemsData = _.map(items, (item) => ({value: item.value, alternateText: item.description, keyForList: item.value, text: item.label, isSelected: item === selectedItem}));
        return [{data: itemsData}];
    }, [items, selectedItem]);

    return (
        <Modal
            type={CONST.MODAL.MODAL_TYPE.RIGHT_DOCKED}
            isVisible={isVisible}
            onClose={onClose}
            onModalHide={onClose}
            hideModalContentWhileAnimating
            useNativeDriver
        >
            <ScreenWrapper
                style={[styles.pb0]}
                includePaddingTop={false}
                includeSafeAreaPaddingBottom={false}
                testID="ValueSelectorModal"
            >
                <HeaderWithBackButton
                    title={label}
                    onBackButtonPress={onClose}
                />
                <SelectionList
                    sections={sections}
                    onSelectRow={onItemSelected}
                    initiallyFocusedOptionKey={selectedItem.value}
                    shouldStopPropagation
                    shouldShowTooltips={shouldShowTooltips}
                />
            </ScreenWrapper>
        </Modal>
    );
}

ValueSelectorModal.propTypes = propTypes;
ValueSelectorModal.defaultProps = defaultProps;
ValueSelectorModal.displayName = 'ValueSelectorModal';

export default ValueSelectorModal;
