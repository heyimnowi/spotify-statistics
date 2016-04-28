'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

angular.module('app-bootstrap').factory('ExampleModel', ['AbstractModel', function (AbstractModel) {
  var ExampleModel = function (_AbstractModel) {
    _inherits(ExampleModel, _AbstractModel);

    // Example: {
    //   owner: {
    //     firstName: string;
    //     lastName: string;
    //   },
    //   dates: {
    //     emitionDate: date Object;
    //     expirationDate: date Object;
    //   }
    // }

    function ExampleModel(exampleObject) {
      _classCallCheck(this, ExampleModel);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExampleModel).call(this, exampleObject));

      _this.ownerName = _this.owner.firstName + ' ' + _this.owner.lastName;
      _this.emitionDate = _this.dates.emition.toLocaleDateString();
      _this.expirationDate = _this.dates.expiration.toLocaleDateString();
      return _this;
    }

    _createClass(ExampleModel, [{
      key: 'serialize',
      value: function serialize() {
        var serializedExample = _get(Object.getPrototypeOf(ExampleModel.prototype), 'serialize', this).call(this);
        serializedExample.dates = { emition: this.emitionDate, expiration: this.expirationDate };
        delete serializedExample.emitionDate;
        delete serializedExample.expirationDate;
        return serializedExample;
      }
    }, {
      key: 'nonSerializableAttributes',
      get: function get() {
        return [].concat(_toConsumableArray(_get(Object.getPrototypeOf(ExampleModel.prototype), 'nonSerializableAttributes', this)), ['ownerName']);
      }
    }]);

    return ExampleModel;
  }(AbstractModel);

  return ExampleModel;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2RlbHMvRXhhbXBsZU1vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsUUFBUSxNQUFSLENBQWUsZUFBZixFQUFnQyxPQUFoQyxDQUF3QyxjQUF4QyxFQUF3RCxDQUN0RCxlQURzRCxFQUV0RCxVQUFVLGFBQVYsRUFBeUI7QUFBQSxNQUVqQixZQUZpQjtBQUFBOzs7Ozs7Ozs7Ozs7O0FBY3JCLDBCQUFhLGFBQWIsRUFBNEI7QUFBQTs7QUFBQSxrR0FFcEIsYUFGb0I7O0FBRzFCLFlBQUssU0FBTCxHQUFvQixNQUFLLEtBQUwsQ0FBVyxTQUEvQixTQUE0QyxNQUFLLEtBQUwsQ0FBVyxRQUF2RDtBQUNBLFlBQUssV0FBTCxHQUFtQixNQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLGtCQUFuQixFQUFuQjtBQUNBLFlBQUssY0FBTCxHQUFzQixNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLGtCQUF0QixFQUF0QjtBQUwwQjtBQU0zQjs7QUFwQm9CO0FBQUE7QUFBQSxrQ0EwQlI7QUFDWCxZQUFNLHFHQUFOO0FBQ0EsMEJBQWtCLEtBQWxCLEdBQTBCLEVBQUUsU0FBUyxLQUFLLFdBQWhCLEVBQTZCLFlBQVksS0FBSyxjQUE5QyxFQUExQjtBQUNBLGVBQU8sa0JBQWtCLFdBQXpCO0FBQ0EsZUFBTyxrQkFBa0IsY0FBekI7QUFDQSxlQUFPLGlCQUFQO0FBQ0Q7QUFoQ29CO0FBQUE7QUFBQSwwQkFzQlk7QUFDL0Isc0lBQTRDLFdBQTVDO0FBQ0Q7QUF4Qm9COztBQUFBO0FBQUEsSUFFSSxhQUZKOztBQW1DdkIsU0FBTyxZQUFQO0FBQ0QsQ0F0Q3FELENBQXhEIiwiZmlsZSI6ImFwcC9tb2RlbHMvRXhhbXBsZU1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcC1ib290c3RyYXAnKS5mYWN0b3J5KCdFeGFtcGxlTW9kZWwnLCBbXG4gICdBYnN0cmFjdE1vZGVsJyxcbiAgZnVuY3Rpb24gKEFic3RyYWN0TW9kZWwpIHtcblxuICAgIGNsYXNzIEV4YW1wbGVNb2RlbCBleHRlbmRzIEFic3RyYWN0TW9kZWwge1xuXG4gICAgICAvLyBFeGFtcGxlOiB7XG4gICAgICAvLyAgIG93bmVyOiB7XG4gICAgICAvLyAgICAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gICAgICAvLyAgICAgbGFzdE5hbWU6IHN0cmluZztcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgZGF0ZXM6IHtcbiAgICAgIC8vICAgICBlbWl0aW9uRGF0ZTogZGF0ZSBPYmplY3Q7XG4gICAgICAvLyAgICAgZXhwaXJhdGlvbkRhdGU6IGRhdGUgT2JqZWN0O1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgICBjb25zdHJ1Y3RvciAoZXhhbXBsZU9iamVjdCkge1xuXG4gICAgICAgIHN1cGVyKGV4YW1wbGVPYmplY3QpO1xuICAgICAgICB0aGlzLm93bmVyTmFtZSA9IGAke3RoaXMub3duZXIuZmlyc3ROYW1lfSAke3RoaXMub3duZXIubGFzdE5hbWV9YDtcbiAgICAgICAgdGhpcy5lbWl0aW9uRGF0ZSA9IHRoaXMuZGF0ZXMuZW1pdGlvbi50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgICAgdGhpcy5leHBpcmF0aW9uRGF0ZSA9IHRoaXMuZGF0ZXMuZXhwaXJhdGlvbi50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgZ2V0IG5vblNlcmlhbGl6YWJsZUF0dHJpYnV0ZXMgKCkge1xuICAgICAgICByZXR1cm4gWy4uLnN1cGVyLm5vblNlcmlhbGl6YWJsZUF0dHJpYnV0ZXMsICdvd25lck5hbWUnXTtcbiAgICAgIH1cblxuICAgICAgc2VyaWFsaXplICgpIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEV4YW1wbGUgPSBzdXBlci5zZXJpYWxpemUoKTtcbiAgICAgICAgc2VyaWFsaXplZEV4YW1wbGUuZGF0ZXMgPSB7IGVtaXRpb246IHRoaXMuZW1pdGlvbkRhdGUsIGV4cGlyYXRpb246IHRoaXMuZXhwaXJhdGlvbkRhdGUgfTtcbiAgICAgICAgZGVsZXRlIHNlcmlhbGl6ZWRFeGFtcGxlLmVtaXRpb25EYXRlO1xuICAgICAgICBkZWxldGUgc2VyaWFsaXplZEV4YW1wbGUuZXhwaXJhdGlvbkRhdGU7XG4gICAgICAgIHJldHVybiBzZXJpYWxpemVkRXhhbXBsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRXhhbXBsZU1vZGVsO1xuICB9XG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
