'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('app-bootstrap').factory('AbstractModel', ['Restangular', function (Restangular) {

  var privateBuild = function privateBuild(modelData) {
    return new this(modelData);
  };

  var AbstractModel = function () {
    function AbstractModel(modelData) {
      _classCallCheck(this, AbstractModel);

      _.extend(this, modelData);
    }

    /**
     * List of attributes that should be serialized with custom methods
     * @return [string]
     */


    _createClass(AbstractModel, [{
      key: 'equals',
      value: function equals(other) {
        if (!other) {
          return false;
        }
        return _.isEqual(Restangular.stripRestangular(this), Restangular.stripRestangular(other));
      }

      /**
       * Returns the json object of the model that the backend is expecting
       */

    }, {
      key: 'serialize',
      value: function serialize() {
        var _this = this;

        var serializedModel = angular.copy(this);

        // remove restangular boilerplate
        if (serializedModel.restangularized) {
          serializedModel = Restangular.stripRestangular(serializedModel);
        }

        // serialize attributes with custom serializers
        this.serializableAttributes.forEach(function (attr) {
          var attrValue = _this[attr];
          if (attrValue) {
            serializedModel[attr] = _.isArray(attrValue) ? attrValue.map(function (each) {
              return each.serialize();
            }) : attrValue.serialize();
          } else {
            serializedModel = _.omit(serializedModel, attr);
          }
        });

        // remove attributes that should not be serialized
        return _.omit(serializedModel, this.nonSerializableAttributes);
      }
    }, {
      key: 'serializableAttributes',
      get: function get() {
        return [];
      }

      /**
       * List of attributes that should not be sent to the backend
       * @return [string]
       */

    }, {
      key: 'nonSerializableAttributes',
      get: function get() {
        return [];
      }
    }], [{
      key: 'apiResponseTransformer',
      value: function apiResponseTransformer(modelData) {
        return _.isArray(modelData) ? modelData.map(privateBuild.bind(this)) : privateBuild.bind(this)(modelData);
      }
    }]);

    return AbstractModel;
  }();

  return AbstractModel;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2RlbHMvQWJzdHJhY3RNb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxRQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQWdDLE9BQWhDLENBQXdDLGVBQXhDLEVBQXlELENBQ3ZELGFBRHVELEVBRXZELFVBQVUsV0FBVixFQUF1Qjs7QUFFckIsTUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFVLFNBQVYsRUFBcUI7QUFDeEMsV0FBTyxJQUFJLElBQUosQ0FBUyxTQUFULENBQVA7QUFDRCxHQUZEOztBQUZxQixNQU1mLGFBTmU7QUFRbkIsMkJBQWEsU0FBYixFQUF3QjtBQUFBOztBQUN0QixRQUFFLE1BQUYsQ0FBUyxJQUFULEVBQWUsU0FBZjtBQUNEOzs7Ozs7OztBQVZrQjtBQUFBO0FBQUEsNkJBNEJYLEtBNUJXLEVBNEJKO0FBQ2IsWUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNWLGlCQUFPLEtBQVA7QUFDRDtBQUNELGVBQU8sRUFBRSxPQUFGLENBQVUsWUFBWSxnQkFBWixDQUE2QixJQUE3QixDQUFWLEVBQThDLFlBQVksZ0JBQVosQ0FBNkIsS0FBN0IsQ0FBOUMsQ0FBUDtBQUNEOzs7Ozs7QUFqQ2tCO0FBQUE7QUFBQSxrQ0FzQ047QUFBQTs7QUFDWCxZQUFJLGtCQUFrQixRQUFRLElBQVIsQ0FBYSxJQUFiLENBQXRCOzs7QUFHQSxZQUFJLGdCQUFnQixlQUFwQixFQUFxQztBQUNuQyw0QkFBa0IsWUFBWSxnQkFBWixDQUE2QixlQUE3QixDQUFsQjtBQUNEOzs7QUFHRCxhQUFLLHNCQUFMLENBQTRCLE9BQTVCLENBQW9DLFVBQUMsSUFBRCxFQUFVO0FBQzVDLGNBQU0sWUFBWSxNQUFLLElBQUwsQ0FBbEI7QUFDQSxjQUFJLFNBQUosRUFBZTtBQUNiLDRCQUFnQixJQUFoQixJQUF3QixFQUFFLE9BQUYsQ0FBVSxTQUFWLElBQ3RCLFVBQVUsR0FBVixDQUFjLFVBQUMsSUFBRDtBQUFBLHFCQUFVLEtBQUssU0FBTCxFQUFWO0FBQUEsYUFBZCxDQURzQixHQUNzQixVQUFVLFNBQVYsRUFEOUM7QUFFRCxXQUhELE1BR087QUFDTCw4QkFBa0IsRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixJQUF4QixDQUFsQjtBQUNEO0FBQ0YsU0FSRDs7O0FBV0EsZUFBTyxFQUFFLElBQUYsQ0FBTyxlQUFQLEVBQXdCLEtBQUsseUJBQTdCLENBQVA7QUFDRDtBQTNEa0I7QUFBQTtBQUFBLDBCQWdCVztBQUM1QixlQUFPLEVBQVA7QUFDRDs7Ozs7OztBQWxCa0I7QUFBQTtBQUFBLDBCQXdCYztBQUMvQixlQUFPLEVBQVA7QUFDRDtBQTFCa0I7QUFBQTtBQUFBLDZDQTZEWSxTQTdEWixFQTZEdUI7QUFDeEMsZUFBTyxFQUFFLE9BQUYsQ0FBVSxTQUFWLElBQ0wsVUFBVSxHQUFWLENBQWMsYUFBYSxJQUFiLENBQWtCLElBQWxCLENBQWQsQ0FESyxHQUNvQyxhQUFhLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0IsU0FBeEIsQ0FEM0M7QUFFRDtBQWhFa0I7O0FBQUE7QUFBQTs7QUFvRXJCLFNBQU8sYUFBUDtBQUNELENBdkVzRCxDQUF6RCIsImZpbGUiOiJhcHAvbW9kZWxzL0Fic3RyYWN0TW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwLWJvb3RzdHJhcCcpLmZhY3RvcnkoJ0Fic3RyYWN0TW9kZWwnLCBbXG4gICdSZXN0YW5ndWxhcicsXG4gIGZ1bmN0aW9uIChSZXN0YW5ndWxhcikge1xuXG4gICAgY29uc3QgcHJpdmF0ZUJ1aWxkID0gZnVuY3Rpb24gKG1vZGVsRGF0YSkge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKG1vZGVsRGF0YSk7XG4gICAgfTtcblxuICAgIGNsYXNzIEFic3RyYWN0TW9kZWwge1xuXG4gICAgICBjb25zdHJ1Y3RvciAobW9kZWxEYXRhKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMsIG1vZGVsRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogTGlzdCBvZiBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIHNlcmlhbGl6ZWQgd2l0aCBjdXN0b20gbWV0aG9kc1xuICAgICAgICogQHJldHVybiBbc3RyaW5nXVxuICAgICAgICovXG4gICAgICBnZXQgc2VyaWFsaXphYmxlQXR0cmlidXRlcyAoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBMaXN0IG9mIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgbm90IGJlIHNlbnQgdG8gdGhlIGJhY2tlbmRcbiAgICAgICAqIEByZXR1cm4gW3N0cmluZ11cbiAgICAgICAqL1xuICAgICAgZ2V0IG5vblNlcmlhbGl6YWJsZUF0dHJpYnV0ZXMgKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGVxdWFscyAob3RoZXIpIHtcbiAgICAgICAgaWYgKCFvdGhlcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5pc0VxdWFsKFJlc3Rhbmd1bGFyLnN0cmlwUmVzdGFuZ3VsYXIodGhpcyksIFJlc3Rhbmd1bGFyLnN0cmlwUmVzdGFuZ3VsYXIob3RoZXIpKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRoZSBqc29uIG9iamVjdCBvZiB0aGUgbW9kZWwgdGhhdCB0aGUgYmFja2VuZCBpcyBleHBlY3RpbmdcbiAgICAgICAqL1xuICAgICAgc2VyaWFsaXplICgpIHtcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWRNb2RlbCA9IGFuZ3VsYXIuY29weSh0aGlzKTtcblxuICAgICAgICAvLyByZW1vdmUgcmVzdGFuZ3VsYXIgYm9pbGVycGxhdGVcbiAgICAgICAgaWYgKHNlcmlhbGl6ZWRNb2RlbC5yZXN0YW5ndWxhcml6ZWQpIHtcbiAgICAgICAgICBzZXJpYWxpemVkTW9kZWwgPSBSZXN0YW5ndWxhci5zdHJpcFJlc3Rhbmd1bGFyKHNlcmlhbGl6ZWRNb2RlbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXJpYWxpemUgYXR0cmlidXRlcyB3aXRoIGN1c3RvbSBzZXJpYWxpemVyc1xuICAgICAgICB0aGlzLnNlcmlhbGl6YWJsZUF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgIGNvbnN0IGF0dHJWYWx1ZSA9IHRoaXNbYXR0cl07XG4gICAgICAgICAgaWYgKGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgc2VyaWFsaXplZE1vZGVsW2F0dHJdID0gXy5pc0FycmF5KGF0dHJWYWx1ZSkgP1xuICAgICAgICAgICAgICBhdHRyVmFsdWUubWFwKChlYWNoKSA9PiBlYWNoLnNlcmlhbGl6ZSgpKSA6IGF0dHJWYWx1ZS5zZXJpYWxpemUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VyaWFsaXplZE1vZGVsID0gXy5vbWl0KHNlcmlhbGl6ZWRNb2RlbCwgYXR0cik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZW1vdmUgYXR0cmlidXRlcyB0aGF0IHNob3VsZCBub3QgYmUgc2VyaWFsaXplZFxuICAgICAgICByZXR1cm4gXy5vbWl0KHNlcmlhbGl6ZWRNb2RlbCwgdGhpcy5ub25TZXJpYWxpemFibGVBdHRyaWJ1dGVzKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGFwaVJlc3BvbnNlVHJhbnNmb3JtZXIgKG1vZGVsRGF0YSkge1xuICAgICAgICByZXR1cm4gXy5pc0FycmF5KG1vZGVsRGF0YSkgP1xuICAgICAgICAgIG1vZGVsRGF0YS5tYXAocHJpdmF0ZUJ1aWxkLmJpbmQodGhpcykpIDogcHJpdmF0ZUJ1aWxkLmJpbmQodGhpcykobW9kZWxEYXRhKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBBYnN0cmFjdE1vZGVsO1xuICB9XG5dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
